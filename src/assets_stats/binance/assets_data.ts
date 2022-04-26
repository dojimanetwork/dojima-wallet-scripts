import axios from "axios";
import { NetworkType } from "../../types/interfaces/network";
import BinanceClient from "./binance_api";
import { Last24HrResult, LatestPricesResult } from "./utils";
import moment from 'moment';

export default class AssetsData extends BinanceClient {
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
            symbol: res.symbol.slice(0, res.symbol.lastIndexOf("USDT")),
            price: res.price,
          };
          finalResult.push(data);
        }
      });
      return finalResult;
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        throw new Error(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  convertTimestampToDate(timestamp: number) {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
  }

  // Last 24hr assets data
  async getLast24HrData() {
    let requestApi = `${this.api}/api/v3/ticker/24hr`;
    try {
      let response = await axios.get(requestApi);
      let result: Last24HrResult[] = response.data;
      let finalResult: Last24HrResult[] = [];
      (result || []).map((res) => {
        if (res.symbol.endsWith("USDT")) {
          const data = {
            symbol: res.symbol.slice(0, res.symbol.lastIndexOf("USDT")),
            priceChange: res.priceChange,
            priceChangePercent: res.priceChangePercent,
            weightedAvgPrice: res.weightedAvgPrice,
            prevClosePrice: res.prevClosePrice,
            lastPrice: res.lastPrice,
            lastQty: res.lastQty,
            bidPrice: res.bidPrice,
            bidQty: res.bidQty,
            askPrice: res.askPrice,
            askQty: res.askQty,
            openPrice: res.openPrice,
            highPrice: res.highPrice,
            lowPrice: res.lowPrice,
            volume: res.volume,
            quoteVolume: res.quoteVolume,
            openTime: this.convertTimestampToDate(res.openTime as number),
            closeTime: this.convertTimestampToDate(res.closeTime as number),
            firstId: res.firstId,
            lastId: res.lastId,
            count: res.count,
          };
          finalResult.push(data);
        }
      });
      return finalResult;
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        throw new Error(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  async getHistoricalData() {
    let requestApi = `${this.api}/api/v3/ticker/price`;
    try {
      let response = await axios.get(requestApi);
      let result: LatestPricesResult[] = response.data;
      let finalResult: LatestPricesResult[] = [];
      (result || []).map((res) => {
        if (res.symbol.endsWith("USDT")) {
          const data = {
            symbol: res.symbol.slice(0, res.symbol.lastIndexOf("USDT")),
            price: res.price,
          };
          finalResult.push(data);
        }
      });
      return finalResult;
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        throw new Error(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    } 
  }
}
