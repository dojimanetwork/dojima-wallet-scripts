import {getAssets, priceConvertor} from "./utils";
import {AssetsList} from "./types";

export default class CoinMarketCap {
    protected api: string
    constructor() {
        this.api = 'https://pro-api.coinmarketcap.com'
    }

    async convertTokenPrice(amount: number, fromAsset: AssetsList, toAsset: AssetsList) {
        return await priceConvertor(this.api, amount, fromAsset, toAsset)
    }

    async getAssetList() {
        return await getAssets(this.api)
    }
}