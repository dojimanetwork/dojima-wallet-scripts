import axios from "axios";
import moment from "moment";
import { CurrencyList, DisplayOrderList } from "./utils/lists";
import {
  AssetIds,
  AssetsCurrentMarketDataResult,
  DayPriceData,
  PriceHistoryDataByDate,
  PriceHistoryDataByDays,
  DayPriceDataResult,
  PriceHistoryResult,
  PriceHistoryDataByDaysResult,
} from "./utils/types";

export default class CoinGecko {
  api: string;
  constructor() {
    this.api = "https://api.coingecko.com/api/v3";
  }

  convertTimestampToDate(timestamp: number) {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
  }

  convertISOtoUTC(date: string) {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
  }

  // Obtain all the coins' id in order to make API calls
  //   async getAssetsList() {
  //     let requestApi = `${this.api}/coins/list`;
  //     try {

  //     } catch (error) {

  //     }
  //   }

  // all the coins market data (price, market cap, volume)
  // 'assets' - ids of the coin, comma separated crytocurrency symbols (base) [Ex : 'bitcoin,ethereum,...']
  // 'resCurrency' - target currency of market data (usd, eur, jpy, etc.)
  // 'sortOrder' - Order of result display . Default 'market_cap_desc'
  // 'valuesPerPage' - Total results per page: 1 - 250
  async getAssestsCurrentMarketData(
    assets?: string,
    resCurrency?: CurrencyList,
    sortOrder?: DisplayOrderList,
    valuesPerPage?: number,
    page?: number
  ) {
    let requestApi = `${this.api}/coins/markets`;
    if (resCurrency) {
      requestApi += `?vs_currency=${resCurrency}`;
    } else {
      requestApi += `?vs_currency=usd`;
    }
    if (assets) {
      requestApi += `&ids=${assets}`;
    } else {
      let arrData = AssetIds.toString();
      requestApi += `&ids=${arrData}`;
    }
    if (sortOrder) {
      requestApi += `&order=${sortOrder}`;
    } else {
      requestApi += `&order=market_cap_desc`;
    }
    if (valuesPerPage) {
      requestApi += `&per_page=${valuesPerPage}`;
    } else {
      requestApi += `&per_page=100`;
    }
    if (page) {
      requestApi += `&page=${page}`;
    } else {
      requestApi += `&page=1`;
    }

    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: AssetsCurrentMarketDataResult[] = response.data;
        let finalResult: AssetsCurrentMarketDataResult[] = [];
        (result || []).map((res) => {
          const values = {
            id: res.id,
            symbol: res.symbol,
            name: res.name,
            image: res.image,
            current_price: res.current_price,
            market_cap: res.market_cap,
            market_cap_rank: res.market_cap_rank,
            fully_diluted_valuation: res.fully_diluted_valuation,
            total_volume: res.total_volume,
            high_24h: res.high_24h,
            low_24h: res.low_24h,
            price_change_24h: res.price_change_24h,
            price_change_percentage_24h: res.price_change_percentage_24h,
            market_cap_change_24h: res.market_cap_change_24h,
            market_cap_change_percentage_24h:
              res.market_cap_change_percentage_24h,
            circulating_supply: res.circulating_supply,
            total_supply: res.total_supply,
            max_supply: res.max_supply,
            ath: res.ath,
            ath_change_percentage: res.ath_change_percentage,
            ath_date: this.convertISOtoUTC(res.ath_date),
            atl: res.atl,
            atl_change_percentage: res.atl_change_percentage,
            atl_date: this.convertISOtoUTC(res.atl_date),
            roi: res.roi,
            last_updated: this.convertISOtoUTC(res.last_updated),
          };
          finalResult.push(values);
        });
        return finalResult;
      } else {
        console.log("Error retrieving data from API");
      }
    } catch (error) {
      console.log("Unexpected error", error);
    }
  }

  // Get historical data (name, price, market, stats) at a given date for a coin
  // By default made use of 'usd' as return value
  // 'date' input should be of format 'DD-MM-YYYY'
  async getAssetHistoryPriceByDate(asset: string, date: string) {
    let requestApi = `${this.api}/coins/${asset}/history?date=${date}`;
    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: PriceHistoryDataByDate = response.data;
        let finalResult: PriceHistoryResult[] = [];
        if (result.market_data !== null) {
          const data = {
            current_price: result.market_data.current_price.usd,
            market_cap: result.market_data.market_cap.usd,
            total_volume: result.market_data.total_volume.usd,
          };
          finalResult.push(data);
        }
        return finalResult;
      } else {
        console.log("Error retrieving data from API");
      }
    } catch (error) {
      console.log("Unexpected error", error);
    }
  }

  // Get historical market data include price, market cap, and 24h volume (granularity auto)
  // Minutely data will be used for duration within 1 day,
  // Hourly data will be used for duration between 1 day and 10 days,
  // Daily data will be used for duration above 10 days.
  async getAssetHistoryPriceByNoOfDays(asset: string, noOfDays: number) {
    let requestApi = `${this.api}/coins/${asset}/market_chart?vs_currency=usd`;
    if (noOfDays > 10) {
      requestApi += `&days=${noOfDays}&interval=daily`;
    } else if (noOfDays <= 10 && noOfDays > 1) {
      requestApi += `&days=${noOfDays}&interval=hourly`;
    } else {
      requestApi += `&days=${noOfDays}`;
    }

    try {
      let response = await axios.get(requestApi);
      if (response.status == 200) {
        let result: PriceHistoryDataByDays = response.data;
        let pricesResult: DayPriceDataResult[] = [];
        (result.prices || []).map((res: DayPriceData) => {
          const data = {
            date: this.convertTimestampToDate(res[0]),
            price: res[1],
          };
          pricesResult.push(data);
        });
        let marketCapResult: DayPriceDataResult[] = [];
        (result.market_caps || []).map((res: DayPriceData) => {
          const data = {
            date: this.convertTimestampToDate(res[0]),
            price: res[1],
          };
          marketCapResult.push(data);
        });
        let totalVolumeResult: DayPriceDataResult[] = [];
        (result.total_volumes || []).map((res: DayPriceData) => {
          const data = {
            date: this.convertTimestampToDate(res[0]),
            price: res[1],
          };
          totalVolumeResult.push(data);
        });
        let finalResult: PriceHistoryDataByDaysResult[] = [];
        finalResult = [
          {
            prices: pricesResult,
            market_cap: marketCapResult,
            total_volume: totalVolumeResult,
          },
        ];
        return finalResult;
      } else {
        console.log("Error retrieving data from API");
      }
    } catch (error) {
      console.log("Unexpected error", error);
    }
  }
}
