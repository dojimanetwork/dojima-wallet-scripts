import {ApiPromise, Keyring, WsProvider} from '@polkadot/api'
import { KeyringPair } from "@polkadot/keyring/types";
import {ChainClientParams, Network} from "@d11k-ts/client";
import {validatePhrase} from "@d11k-ts/crypto";
import {GasfeeResult, PolkachainClientParams, PolkaTxParams, ProviderId, ProviderIds, rawTxType} from "./types";

export const DOT_DECIMAL = 12

export interface PolkaChainClient {
    createInstance(): Promise<ApiPromise>
    getAddress(): Promise<string>,
    getBalance(address: string): Promise<number>,
    getFees(params: PolkaTxParams): Promise<GasfeeResult>
    buildTx(params: PolkaTxParams): Promise<rawTxType>
    transfer(params: PolkaTxParams): Promise<string>
    polkaBatchTxsToHermes(rawTxs: rawTxType[], memo?: string): Promise<string>
}

class PolkadotClient implements PolkaChainClient{
    protected network: Network
    protected providers: ProviderIds
    protected phrase = ''

    constructor({
                    phrase,
                    network = Network.Mainnet,
                    providers = {
                        [Network.Mainnet]: 'wss://rpc.polkadot.io',
                        [Network.Stagenet]: 'wss://rpc.polkadot.io',
                        [Network.Testnet]: 'wss://westend-rpc.polkadot.io',
                    }
                }: ChainClientParams & PolkachainClientParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase')
            }
            this.phrase = phrase
        }
        this.network = network
        this.providers = providers
    }

    getProvider(): ProviderId {
        return this.providers[this.network]
    }

    rpcProvider(): WsProvider {
        const wsProvider = new WsProvider(`${this.getProvider()}`)
        return wsProvider
    }

    async createInstance(): Promise<ApiPromise> {
        return await ApiPromise.create({provider: this.rpcProvider()})
    }

    private mnemonicAccount(): KeyringPair {
        if (!this.phrase) throw new Error('Phrase not set')

        const keyring = new Keyring({type: 'sr25519'})
        const newPair = keyring.addFromUri(this.phrase)
        return newPair
    }

    /**
     * Get the current address.
     *
     * @param {number} index (optional) Account index for the derivation path
     * @returns {Address} The current address.
     *
     * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    async getAddress(): Promise<string> {
        await this.createInstance()
        const keyPair = this.mnemonicAccount()
        return keyPair.address
    }

    async getBalance(address: string): Promise<number> {
        const api = await this.createInstance()
        let balance = (
            await api.derive.balances.all(address)
        ).availableBalance.toNumber();
        balance = balance / Math.pow(10, 12);
        return balance;
    }

    async buildTx({ recipient, amount }: PolkaTxParams): Promise<rawTxType> {
        const api = await this.createInstance()
        const toAmount = amount * Math.pow(10, 12);
        const rawTx: rawTxType = api.tx.balances.transfer(recipient, toAmount)
        return rawTx
    }

    async transfer({ recipient, amount }: PolkaTxParams): Promise<string> {
        const rawTx = await this.buildTx({recipient, amount});
        const hash = await rawTx.signAndSend(this.mnemonicAccount())
        return hash.toHex()
    }

    async getFees({ recipient, amount }: PolkaTxParams): Promise<GasfeeResult> {
        const rawTx = await this.buildTx({recipient, amount});
        const paymentInfo = await rawTx.paymentInfo(await this.getAddress());
        const gasFee = paymentInfo.partialFee.toNumber() / Math.pow(10, 12);
        return {
            slow: gasFee,
            average: gasFee,
            fast: gasFee,
        };
    }

    async polkaBatchTxsToHermes(rawTxs: rawTxType[], memo?: string): Promise<string> {
        const api = await this.createInstance()
        if (memo) {
            const remark = api.tx.system.remark(`${memo}`)
            rawTxs.concat(remark)
        }
        const batchTx = await api.tx.utility.batchAll(rawTxs).signAndSend(this.mnemonicAccount())
        return batchTx.toHex()
    }
}

export { PolkadotClient }