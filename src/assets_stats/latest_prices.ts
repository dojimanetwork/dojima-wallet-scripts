import axios from "axios";
import { NetworkType } from "../types/interfaces/network";
import BinanceClient from "./binance_api";
import { LatestPricesResult } from "./utils";

export default class AssetLatestPrices extends BinanceClient {
  constructor(network: NetworkType) {
    super(network);
  }

  // Latest prices of each token in other tokens currency
  // By default it generates all symbols if no asset parameter is passed.
  async getLatestPrices() {
    let requestApi = `${this.api}/api/v3/ticker/price`;
    try {
      let response = await axios.get(requestApi);
      let result: LatestPricesResult[] = response.data;
      let finalResult: LatestPricesResult[] = [];
      (result || []).map((res) => {
        if (res.symbol.endsWith("USDT")) {
          const data = {
            symbol: res.symbol.slice(0, res.symbol.lastIndexOf('USDT')),
            price: res.price,
          };
          finalResult.push(data);
        }
      });
      return finalResult;
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        return new Error(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }
}
