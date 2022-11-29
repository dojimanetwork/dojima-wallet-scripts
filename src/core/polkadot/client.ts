import {ApiPromise, Keyring, WsProvider} from '@polkadot/api'
import { KeyringPair } from "@polkadot/keyring/types";
import {SubmittableExtrinsic} from "@polkadot/api/types";
import {ISubmittableResult} from "@polkadot/types/types";

class PolkadotClient {
    _provider: string
    private _phrase: string
    constructor(phrase?: string) {
        this._phrase = phrase
        // this._provider = 'ws://127.0.0.1:9944'
        // this._provider = 'wss://rpc.polkadot.io'
        this._provider = 'wss://westend-rpc.polkadot.io'
    }

    rpcProvider(): WsProvider {
        const wsProvider = new WsProvider(`${this._provider}`)
        return wsProvider
    }

    async createInstance(): Promise<ApiPromise> {
        return await ApiPromise.create({provider: this.rpcProvider()})
    }

    private mnemonicAccount(): KeyringPair {
        if (!this._phrase) throw new Error('Phrase not set')

        const keyring = new Keyring({type: 'sr25519'})
        const newPair = keyring.addFromUri(this._phrase)
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
    async getAddress(index = 0): Promise<string> {
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

    async buildTx(receipient: string, amount: number): Promise<SubmittableExtrinsic<"promise", ISubmittableResult>> {
        const api = await this.createInstance()
        const toAmount = amount * Math.pow(10, 12);
        const rawTx = api.tx.balances.transfer(receipient, toAmount)
        return rawTx
    }

    async transfer(receipient: string, amount: number): Promise<string> {
        const rawTx = await this.buildTx(receipient, amount);
        const hash = await rawTx.signAndSend(this.mnemonicAccount())
        return hash.toHex()
    }

    async getFees(receipient: string, amount: number): Promise<number> {
        const rawTx = await this.buildTx(receipient, amount);
        const paymentInfo = await rawTx.paymentInfo(await this.getAddress());
        const gasFee = paymentInfo.partialFee.toNumber() / Math.pow(10, 12);
        return gasFee
    }

    async hermesTransaction(receipient: string, amount: number, memo: string): Promise<string> {
        const rawTx = await this.buildTx(receipient, amount);
        const api = await this.createInstance()
        const remark = api.tx.system.remark(`${memo}`)
        const batchTx = await api.tx.utility.batchAll([remark, rawTx]).signAndSend(this.mnemonicAccount())
        return batchTx.toHex()
    }
}

export { PolkadotClient }