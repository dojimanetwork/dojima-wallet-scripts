import {
    HermesSdkClient,
    DOJ_DECIMAL
} from "../../core/hermes";
import { NetworkType } from "./network";
import {
    assetAmount,
    AssetDOJNative,
    assetToBase,
    baseToAsset } from "@d11k-ts/utils";
import { Network } from "@d11k-ts/client";

export default class DojimaClient {
    _network: NetworkType;
    _client: HermesSdkClient;
    constructor(mnemonic: string, network: NetworkType) {
        this._network = network;
        this._client = new HermesSdkClient({phrase: mnemonic, network: Network.Mainnet});
    }

    async getAddress() {
        const address = this._client.getAddress();
        return address;
    }

    async getBalance(address: string) {
        const balance = await this._client.getBalance(address, [AssetDOJNative]);
        const bal = (baseToAsset(balance[0].amount)).amount();
        return bal.toNumber();
        // return balance;
    }

    async getTxData(hash: string) {
        const address = await this.getAddress();
        const data = await this._client.getTransactionData(hash, address);
        return data;
    }

    async getGasFee() {
        const fees = await this._client.getFees();
        return fees;
    }

    async getTxsHistory(address: string) {
        const txs = await this._client.getTransactions({address: address, limit: 25});
        return txs;
    }

    async transfer(amountToTransfer: number, to: string) {
        let amount = assetToBase(assetAmount(amountToTransfer, DOJ_DECIMAL ))
        const txhash = await this._client.transfer({
            amount, recipient: to
        });
        return txhash;
    }
}