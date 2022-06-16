import axios from "axios";
import { NetworkType } from "../types/interfaces/network";
import { BtcTxDataResult, BtcTxHashDataResult, BtcTxHistoryParams, BtcTxHistoryResult, BtcTxsResult } from "./utils";
import moment from "moment";
import BtcClient from "../types/interfaces/bitcoin_client";

export default class BitcoinTransactions extends BtcClient {
  constructor(network: NetworkType) {
    super(network);
  }

  convertDateToTimestamp(date: string) {
    const timestamp = moment(date).format("X"); // lowercase 'x' for timestamp in milliseconds
    return Number(timestamp);
  }

  convertTimestampToDate(timestamp: number) {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
  }

  convertISOtoUTC(date: string) {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
  }

  // list of transactions done by the address.
  // 'limit': integer - No. of records to generate.
  // 'offset': integer - No. from which record output should be generated

  async getTransactionsHistory(params: BtcTxHistoryParams) {
    // try {
    //   // getTransactions method output max 50 records.
    //   // 'limit': integer - No. of records we require of total 50. Default value 10.
    //   // 'offset': integer - No. from which record output should be generated
    //   let transactions = await this._client.getTransactions({
    //     address: params.address,
    //     offset: params.startIndex ? params.startIndex : 0,
    //     limit: params.limit ? params.limit : 10,
    //   });
    //   console.log(transactions.txs.length);
    //   return transactions;
    // } catch (error) {
    //   //   console.log("No transactions found");
    //   if (error instanceof Error) {
    //     // ✅ TypeScript knows err is Error
    //     throw new Error(error.message);
    //   } else {
    //     console.log("Unexpected error", error);
    //   }
    // }
    let requestUrl = `${this._client.haskoinUrl}/address/transactions?addresses=${params.address}`;
    if (params.limit) {
      requestUrl += `&limit=${params.limit}`;
    } else {
      requestUrl += `&limit=100`;
    }
    if (params.startIndex) {
      requestUrl += `&offset=${params.startIndex}`;
    } else {
      requestUrl += `&offset=0`;
    }
    try {
      let response = await axios.get(requestUrl);
      if (response.status && response.status === 200) {
        let result: BtcTxHistoryResult[] = response.data;
        if (result !== (null || undefined)) {
          const finalResult: BtcTxsResult = {
            txs: result.map((res) => ({
              transaction_hash: res.txid,
              block: res.block.height,
            })),
          };
          return finalResult;
        } else {
          return {
            txs: [],
          };
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getDetailTransactionData(txHash: string) {
    // try {
    //   const txData = await this._client.getTransactionData(txHash);
    // //   console.log(txData);
    //   return txData;
    // } catch (error) {
    //   if (error instanceof Error) {
    //     // ✅ TypeScript knows err is Error
    //     throw new Error(error.message);
    //   } else {
    //     console.log("Unexpected error", error);
    //   }
    // }
    let requestUrl = `${this._client.haskoinUrl}/transaction/${txHash}`;
    try {
      let response = await axios.get(requestUrl);
      if (response.status) {
        if (response.status === 200) {
          let result: BtcTxHashDataResult = response.data;
          if (result !== (null || undefined)) {
            const finalResult: BtcTxDataResult = {
              txid: result.txid,
              size: result.size,
              version: result.version,
              locktime: result.locktime,
              fee: Number(result.fee / Math.pow(10, 8)),
              inputs: result.inputs,
              outputs: result.outputs,
              block: result.block,
              deleted: result.deleted,
              timestamp: this.convertTimestampToDate(result.time * 1000),
              rbf: result.rbf,
              weight: result.weight,
              from: result.inputs[0].address,
              fromValue: Number(result.inputs[0].value / Math.pow(10, 8)),
              to1: result.outputs[0].address,
              to1Value: Number(result.outputs[0].value / Math.pow(10, 8)),
              to2: result.outputs[1].address,
              to2Value: Number(result.outputs[1].value / Math.pow(10, 8)),
            };
            return finalResult;
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getTransactionData(txHash: string, address: string) {
    let requestUrl = `${this._client.haskoinUrl}/transaction/${txHash}`;
    try {
      let response = await axios.get(requestUrl);
      if (response.status) {
        if (response.status === 200) {
          let result: BtcTxHashDataResult = response.data;
          if (result !== (null || undefined)) {
            let date = "";
            let time = "";
            let tx_type = "";
            let amount = 0;
            if (result.time !== (null || undefined)) {
              let dateValue = this.convertTimestampToDate(result.time * 1000);
              date = moment(this.convertISOtoUTC(dateValue)).format(
                "DD/MM/YYYY"
              );
              time = moment(this.convertISOtoUTC(dateValue)).format("HH:mm:ss");
            }
            if (
              (result.inputs !== null || result.inputs !==  []) &&
              result.inputs[0].address === address
            ) {
              tx_type = "Send | BTC";
              amount = result.inputs[0].value;
            } else {
              if (result.outputs !== null || result.outputs !== []) {
                for (let i = 0; i < result.outputs.length; i++) {
                  if (result.outputs[i].address === address) {
                    tx_type = "Receive | BTC";
                    amount = result.outputs[i].value;
                    break;
                  }
                }
              }
            }
            return {
              transaction_type: tx_type,
              transaction_hash: result.txid,
              value: Number(amount / Math.pow(10, 8)),
              block: result.block.height,
              date: date,
              time: time,
              gas_fee: Number(result.fee / Math.pow(10, 8)),
            };
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
}
