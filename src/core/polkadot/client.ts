import { ChainClientParams, Network } from "../client";
import { validatePhrase } from "../crypto";
import { InboundAddressResult, SwapAssetList } from "../utils";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import "@polkadot/api-augment";
import { KeyringPair } from "@polkadot/keyring/types";
import axios from "axios";
import BigNumber from "bignumber.js";

import { GasfeeResult, PolkaTxParams, rawTxType } from "./types";
import {
    calcDoubleSwapOutput,
    calcDoubleSwapSlip,
    calcSwapOutput,
    calcSwapSlip,
    PoolData,
    SwapFeeResult
} from "../swap_utils";

export type ChainProviderParams = {
    provider?: string;
};

export const defaultDotProvider = "wss://rpc.polkadot.io";
export const testnetDotProvider = "wss://westend-rpc.polkadot.io";
export const DOT_DECIMAL = 10;

export interface PolkaChainClient {
    createInstance(): Promise<ApiPromise>;
    getAddress(): Promise<string>;
    getBalance(address: string): Promise<number>;
    getFees(params: PolkaTxParams): Promise<GasfeeResult>;
    buildTx(params: PolkaTxParams): Promise<rawTxType>;
    transfer(params: PolkaTxParams): Promise<string>;
}

class PolkadotClient implements PolkaChainClient {
    protected network: Network;
    protected provider: string;
    protected phrase = "";

    constructor({
                    phrase,
                    network = Network.Mainnet,
                    provider = defaultDotProvider,
                }: ChainClientParams & ChainProviderParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error("Invalid phrase");
            }
            this.phrase = phrase;
        }
        this.network = network;
        if ((this.network === Network.DojTestnet) && provider === defaultDotProvider) {
            throw Error(`'provider' params can't be empty for 'doj-testnet'`)
        }
        if(this.network === Network.Testnet) {
            this.provider = testnetDotProvider
        } else {
            this.provider = provider;
        }
    }

    rpcProvider(): WsProvider {
        const wsProvider = new WsProvider(`${this.provider}`);
        return wsProvider;
    }

    async createInstance(): Promise<ApiPromise> {
        return await ApiPromise.create({ provider: this.rpcProvider() });
    }

    private mnemonicAccount(): KeyringPair {
        if (!this.phrase) throw new Error("Phrase not set");

        const keyring = new Keyring({ type: "sr25519" });
        const newPair = keyring.addFromUri(this.phrase);
        return newPair;
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
        await this.createInstance();
        const keyPair = this.mnemonicAccount();
        return keyPair.address;
    }

    async getBalance(address: string): Promise<number> {
        const api = await this.createInstance();
        // let balance = (await api.derive.balances.all(address)).availableBalance.toNumber()
        // balance = balance / Math.pow(10, DOT_DECIMAL)
        // return balance
        const { data: balance } = await api.query.system.account(address);
        // const decimals = api.registry.chainDecimals
        // const base = new BN(10).pow(new BN(decimals))
        // const freeBalance = `${balance.free}`
        // const dm = new BN(freeBalance).divmod(base)
        // const resultBalance = parseFloat(dm.div.toString() + '.' + dm.mod.toString())
        // return resultBalance
        const baseValue = new BigNumber(`${balance.free}`)
            .div(10 ** (this.network === Network.Testnet ? 12 : DOT_DECIMAL))
            .decimalPlaces((this.network === Network.Testnet ? 12 : DOT_DECIMAL));
        return baseValue.toNumber();
    }

    async buildTx({ recipient, amount }: PolkaTxParams): Promise<rawTxType> {
        const api = await this.createInstance();
        const toAmount = amount * Math.pow(10, (this.network === Network.Testnet ? 12 : DOT_DECIMAL));
        const rawTx: rawTxType = api.tx.balances.transfer(recipient, toAmount);
        return rawTx;
    }

    async transfer({ recipient, amount }: PolkaTxParams): Promise<string> {
        const rawTx = await this.buildTx({ recipient, amount });
        const hash = await rawTx.signAndSend(this.mnemonicAccount());
        return hash.toHex();
    }

    async getFees({ recipient, amount }: PolkaTxParams): Promise<GasfeeResult> {
        const rawTx = await this.buildTx({ recipient, amount });
        const paymentInfo = await rawTx.paymentInfo(await this.getAddress());
        const gasFee =
            paymentInfo.partialFee.toNumber() / Math.pow(10, (this.network === Network.Testnet ? 12 : DOT_DECIMAL));
        return {
            slow: gasFee,
            average: gasFee,
            fast: gasFee,
        };
    }

    getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, DOT_DECIMAL)
        return calcSwapOutput(input, pool, toDoj);
    }

    getDoubleSwapOutput(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, DOT_DECIMAL)
        return calcDoubleSwapOutput(input, pool1, pool2)
    }

    getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, DOT_DECIMAL)
        return calcSwapSlip(input, pool, toDoj);
    }

    getDoubleSwapSlip(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, DOT_DECIMAL)
        return calcDoubleSwapSlip(input, pool1, pool2)
    }

    async getSwapFeesData(): Promise<SwapFeeResult> {
        return
    }

    async getInboundObject(): Promise<InboundAddressResult> {
        const response = await axios.get(
            "https://api-test.h4s.dojima.network/hermeschain/inbound_addresses"
        );
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
            );
        }

        const data: Array<InboundAddressResult> = response.data;
        const inboundObj = data.find(
            (res) => res.chain === "DOT"
        ) as InboundAddressResult;
        return inboundObj;
    }

    async getPolkadotInboundAddress(): Promise<string> {
        const inboundObj = await this.getInboundObject();
        return inboundObj.address;
    }

    async getDefaultLiquidityPoolGasFee(): Promise<number> {
        const inboundObj = await this.getInboundObject();

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, (this.network === Network.Testnet ? 12 : DOT_DECIMAL));

        return gasFee;
    }

    async polkaBatchTxsToHermes(
        amount: number,
        inboundAddress: string,
        memo: string
    ): Promise<string> {
        const api = await this.createInstance();

        const rawTx = await this.buildTx({ recipient: inboundAddress, amount });

        const remark = api.tx.system.remark(`${memo}`);

        const batchTx = await api.tx.utility
            .batchAll([rawTx, remark])
            .signAndSend(this.mnemonicAccount());

        return batchTx.toHex();
    }

    async addLiquidityPool(
        amount: number,
        inboundAddress: string,
        dojAddress?: string
    ): Promise<string> {
        const memo = dojAddress
            ? `memo:ADD:DOT.DOT:${dojAddress}`
            : `memo:ADD:DOT.DOT`;

        const txHash = await this.polkaBatchTxsToHermes(
            amount,
            inboundAddress,
            memo
        );

        return txHash;
    }

    async swap(
        amount: number,
        token: SwapAssetList,
        inboundAddress: string,
        recipient: string
    ): Promise<string> {
        const memo = `memo:SWAP:${token}:${recipient}`;

        const txHash = await this.polkaBatchTxsToHermes(
            amount,
            inboundAddress,
            memo
        );

        return txHash;
    }
}

export { PolkadotClient };
