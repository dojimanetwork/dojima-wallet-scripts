import axios from "axios";
import moment from "moment";
import { AssetIdList } from "./utils/asset_Ids";
import { LatestDataResult, ResponseObject } from "./utils/types";

export default class CryptoCompare {
  api: string;
  constructor() {
    this.api = "https://min-api.cryptocompare.com/data";
  }

  convertTimestampToDate(timestamp: number) {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
  }

  convertDateToTimestamp(date: string) {
    const timestamp = moment(date).format("X"); // lowercase 'x' for timestamp in milliseconds
    return Number(timestamp);
  }

  convertISOtoUTC(date: string) {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
  }

  // Obtain all the coins' id in order to make API calls
  async getAssetsList() {
    let requestApi = `${this.api}/all/coinlist`;
    try {
      let response = await axios.get(requestApi);
      let result: ResponseObject = response.data;
      let data = result.Data;
      let resStr = "";
      for (let id in data) {
        // resStr += ', ' + data[id].Symbol + ' : ' + data[id].CoinName;
        resStr += '| "' + data[id].Symbol + '"';
      }
      return resStr;
    } catch (error) {
      console.log("Error retrieving data from API");
    }
  }

  async getLatestData(token: AssetIdList, apiKey: string) {
    let requestApi = `${this.api}/blockchain/latest?fsym=${token}&api_key=${apiKey}`;
    try {
      let response = await axios.get(requestApi);
      let result: LatestDataResult = response.data;
      if (result.Response === "Success") {
        return result.Data;
      } else if (
        result.Response === "Error" &&
        (result.Message.includes("does not exist") ||
          result.Message.includes("not currently available"))
      ) {
        return "Data not available";
      } else {
        console.log("Error response: Not success");
      }
    } catch (error) {
      console.log("Error retrieving data from API");
    }
  }
}
