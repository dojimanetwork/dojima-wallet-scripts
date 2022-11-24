import {Client, DECIMAL} from "../../core/thor_ref";
import {NetworkType} from "./network";
import {assetAmount, AssetDOJNative, assetToBase, baseToAsset} from "../../core/utils";
import {Network} from "../../core/client";

export default class ThorClient {
    _network: NetworkType;
    _client: Client;
    constructor(mnemonic: string, network: NetworkType) {
        this._network = network;
        this._client = new Client({phrase: mnemonic, network: Network.Mainnet});
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
        // const address = await this.getAddress();
        const data = await this._client.getTransactionData(hash, "dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje");
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
        let amount = assetToBase(assetAmount(amountToTransfer, DECIMAL ))
        const txhash = await this._client.transfer({
            amount, recipient: to
        });
        return txhash;
    }
}
