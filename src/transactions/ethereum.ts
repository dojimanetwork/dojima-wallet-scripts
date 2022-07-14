// import { Client } from "@xchainjs/xchain-ethereum";
// import { Network } from "@xchainjs/xchain-client";
// import { NetworkType } from "../types/interfaces/network";

// export default class EthereumTransaction {
//   _client: Client;
//   constructor(mnemonic: string, network: NetworkType) {
//     this._client = new Client({ phrase: mnemonic });
//     // Default 'network' is 'testnet' in Xchainjs Client
//     if(network === 'mainnet' || network === 'devnet'){
//         this._client.setNetwork(Network.Mainnet);
//     } else{
//         this._client.setNetwork(Network.Testnet);
//     }
//   }

//   async getTransactionsHistory(
//     address: string,
//     startIndex?: number,
//     limit?: number
//   ) {
//     try {
//       // getTransactions method output max 50 records.
//       // 'limit': integer - No. of records we require of total 50. Default value 10.
//       // 'offset': integer - No. from which record output should be generated
//       let transactions = await this._client.getTransactions({
//         address: address,
//         offset: startIndex ? startIndex : 0,
//         limit: limit ? limit : 10,
//       });
//       // console.log(transactions.txs.length);
//       return transactions;
//     } catch (error) {
//       //   console.log("No transactions found");
//       throw new Error(error.message);
//     }
//   }

//   async getTransactionData(txHash: string) {
//     try {
//       const txData = await this._client.getTransactionData(txHash);
//       //   console.log(txData);
//       return txData;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }

import { NetworkType } from "../types/interfaces/network";
// import { get } from "../types/interfaces/http";
import {
  ERC20TxHistoryParams,
  ERC20TxsResult,
  EthTxDataResult,
  EthTxDetailsResult,
  EthTxHashDataResult,
  EthTxsResult,
  TransactionHashDataResult,
  TransactionHistoryResult,
  TxHashDataParams,
  TxHistoryParams,
} from "./utils";
import axios from "axios";
import moment from "moment";
import EthereumWeb3 from "../types/interfaces/ethereum_web3";

export default class EthereumTransactions extends EthereumWeb3 {
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

  async getErc20TransactionsHistory(params: ERC20TxHistoryParams) {
    let requestApi = `${this._api}?module=account&action=${
      params.action
    }&contractaddress=${params.contractAddress}&address=${
      params.fromAddress
    }&startblock=${params.startBlock ? params.startBlock : 0}&endblock=${
      params.endBlock ? params.endBlock : 99999999
    }&page=${params.page ? params.page : 1}&offset=${
      params.limit ? params.limit : 100
    }&sort=${
      params.sort ? params.sort : "desc"
    }&api=6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C`;

    try {
      let response = await axios.get(requestApi);
      // console.log("Response: ", response);
      let parsedData: TransactionHistoryResult = response.data;
      console.log(parsedData.status);
      if (parsedData.status === "1") {
        let result: EthTxDetailsResult[] = parsedData.result;
        // console.log(result);
        if (result !== (null || undefined)) {
          const resultTxs: ERC20TxsResult = {
            txs: result.map((res) => ({
              blockNumber: Number(res.blockNumber),
              timeStamp: new Date(Number(res.timeStamp) * 1000),
              hash: res.hash,
              nonce: Number(res.nonce),
              blockHash: res.blockHash,
              transactionIndex: Number(res.transactionIndex),
              from: res.from,
              to: res.to,
              value: Number(res.value) / Math.pow(10, 18),
              gas: res.gas,
              gasPrice: Number(res.gasPrice) / Math.pow(10, 18),
              isError: "0",
              txreceipt_status: "1",
              input: "0x",
              contractAddress: "",
              cumulativeGasUsed: "7756288",
              gasUsed: "21000",
              confirmations: Number(res.confirmations),
            })),
          };
          return resultTxs;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getTransactionsHistory(params: TxHistoryParams) {
    // let requestUrl = `${this._api}?module=account&action=txlist`;

    // if (params.address) {
    //   requestUrl += `&address=${params.address}`;
    // }
    // if (params.apiKey) {
    //   requestUrl += `&api=${params.apiKey}`;
    // }
    // if (params.limit) {
    //   requestUrl += `&offset=${params.limit}`;
    // } else {
    //   requestUrl += `&offset=10`;
    // }
    // if (params.page) {
    //   requestUrl += `&page=${params.page}`;
    // } else {
    //   requestUrl += `&page=1`;
    // }
    // if (params.sort) {
    //   requestUrl += `&sort=${params.sort}`;
    // } else {
    //   requestUrl += `&sort=desc`;
    // }
    // if (params.startBlock) {
    //   requestUrl += `&startblock=${params.startBlock}`;
    // } else {
    //   requestUrl += `&startblock=0`;
    // }
    // if (params.endBlock) {
    //   requestUrl += `&endblock=${params.endBlock}`;
    // } else {
    //   requestUrl += `&endblock=99999999`;
    // }

    // try {
    //   let response: TransactionHistoryResult = await (
    //     await axios.get(requestUrl)
    //   ).data;
    //   console.log(response.status);
    //   if (response.status === "1") {
    //     let result: EthTxDetailsResult[] = response.result;
    //     console.log(result);
    //     if (result !== (null || undefined)) {
    //       return {
    //         txs: result.map((res) => ({
    //           blockNumber: Number(res.blockNumber),
    //           timeStamp: new Date(Number(res.timeStamp) * 1000),
    //           hash: res.hash,
    //           nonce: Number(res.nonce),
    //           blockHash: res.blockHash,
    //           transactionIndex: Number(res.transactionIndex),
    //           from: res.from,
    //           to: res.to,
    //           value: Number(res.value) / Math.pow(10, 18),
    //           gas: res.gas,
    //           gasPrice: Number(res.gasPrice) / Math.pow(10, 18),
    //           isError: res.isError,
    //           txreceipt_status: res.txreceipt_status,
    //           input: res.input,
    //           contractAddress: res.contractAddress,
    //           cumulativeGasUsed: res.cumulativeGasUsed,
    //           gasUsed: res.gasUsed,
    //           confirmations: Number(res.confirmations),
    //         })),
    //       };
    //     } else {
    //       console.log("Data is empty or unable to retrieve data");
    //     }
    //   } else {
    //     return [];
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     // ✅ TypeScript knows err is Error
    //     throw new Error(error.message);
    //   } else {
    //     console.log("Unexpected error", error);
    //   }
    // }
    let requestUrl = `${this._api}?module=account&action=txlist`;

    if (params.address) {
      requestUrl += `&address=${params.address}`;
    }
    if (params.apiKey) {
      requestUrl += `&api=${params.apiKey}`;
    }
    if (params.limit) {
      requestUrl += `&offset=${params.limit}`;
    } else {
      requestUrl += `&offset=10`;
    }
    if (params.page) {
      requestUrl += `&page=${params.page}`;
    } else {
      requestUrl += `&page=1`;
    }
    if (params.sort) {
      requestUrl += `&sort=${params.sort}`;
    } else {
      requestUrl += `&sort=desc`;
    }
    if (params.startBlock) {
      requestUrl += `&startblock=${params.startBlock}`;
    } else {
      requestUrl += `&startblock=0`;
    }
    if (params.endBlock) {
      requestUrl += `&endblock=${params.endBlock}`;
    } else {
      requestUrl += `&endblock=99999999`;
    }

    try {
      let response: TransactionHistoryResult = await (
        await axios.get(requestUrl)
      ).data;
      // console.log(response.status);
      if (response.status === "1") {
        let result: EthTxDetailsResult[] = response.result;
        // console.log(result);
        if (result !== (null || undefined)) {
          console.log(params.address);
          const resultTxs: EthTxsResult = {
            txs: result.map((res) => ({
              block: Number(res.blockNumber),
              date: moment(
                this.convertISOtoUTC(
                  this.convertTimestampToDate(Number(res.timeStamp) * 1000)
                )
              ).format("DD/MM/YYYY"),
              time: moment(
                this.convertISOtoUTC(
                  this.convertTimestampToDate(Number(res.timeStamp) * 1000)
                )
              ).format("HH:mm:ss"),
              transaction_hash: res.hash,
              contract_address:
                res.contractAddress !== "" ? res.contractAddress : "NA",
              value: Number(res.value) / Math.pow(10, 18),
              gas_price: (Number(res.gasPrice) / Math.pow(10, 18)).toFixed(9),
              from: res.from,
              transaction_type:
                res.from === params.address.toLowerCase()
                  ? "Send | ETH"
                  : "Receive | ETH",
            })),
          };
          return resultTxs;
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

  remove0x(string: string) {
    if (string.startsWith("0x")) {
      const removed0xString = string.substring(2);
      return removed0xString;
    } else {
      return string;
    }
  }

  convertHexToInt(hexValue: string) {
    const intValue = parseInt(hexValue, 16);
    return intValue;
  }

  async getTransactionData(params: TxHashDataParams) {
    let requestUrl = `${this._api}?module=proxy&action=eth_getTransactionByHash`;
    if (params.hash) {
      requestUrl += `&txhash=${params.hash}`;
    }
    if (params.apiKey) {
      requestUrl += `&api=${params.apiKey}`;
    }

    try {
      let response: TransactionHashDataResult = await (
        await axios.get(requestUrl)
      ).data;
      let result: EthTxHashDataResult = response.result;
      if (result !== (null || undefined)) {
        let tx_type = "";
        let etherGasPrice = Number(
          this.convertHexToInt(this.remove0x(result.gasPrice as string)) /
            Math.pow(10, 18)
        ).toFixed(18);
        let gweiGasPrice = Number(
          Number(etherGasPrice) * Math.pow(10, 9)
        ).toFixed(9);
        let type = this.remove0x(result.type);
        if (result.from === params.address) {
          tx_type = "Send | ETH";
        } else {
          tx_type = "Receive | ETH";
        }
        return {
          block: this.convertHexToInt(
            this.remove0x(result.blockNumber as string)
          ),
          transaction_type: tx_type,
          from: this.remove0x(result.from),
          to: this.remove0x(result.to),
          gas_limit: `${Number(
            this.convertHexToInt(this.remove0x(result.gas as string)) /
              Math.pow(10, 9)
          ).toFixed(9)} Gwei`,
          gas_price: `${etherGasPrice} Ether (${gweiGasPrice} Gwei)`,
          transaction_hash: result.hash,
          value:
            this.convertHexToInt(this.remove0x(result.value as string)) /
            Math.pow(10, 18),
          status:
            type === "0" ? "Success" : type === "1" ? "Pending" : "Failed",
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getDetailTransactionData(params: TxHashDataParams) {
    let requestUrl = `${this._api}?module=proxy&action=eth_getTransactionByHash`;
    if (params.hash) {
      requestUrl += `&txhash=${params.hash}`;
    }
    if (params.apiKey) {
      requestUrl += `&api=${params.apiKey}`;
    }

    try {
      let response: TransactionHashDataResult = await (
        await axios.get(requestUrl)
      ).data;
      let result: EthTxHashDataResult = response.result;
      // console.log(result);
      if (result !== (null || undefined)) {
        const resultData: EthTxDataResult = {
          blockHash: result.blockHash,
          blockNumber: this.convertHexToInt(
            this.remove0x(result.blockNumber as string)
          ),
          from: this.remove0x(result.from),
          gas_limit: `${Number(
            this.convertHexToInt(this.remove0x(result.gas as string)) /
              Math.pow(10, 9)
          ).toFixed(9)} Gwei`,
          gasPrice:
            this.convertHexToInt(this.remove0x(result.gasPrice as string)) /
            Math.pow(10, 18),
          hash: result.hash,
          input: this.remove0x(result.input),
          nonce: this.convertHexToInt(this.remove0x(result.nonce as string)),
          to: this.remove0x(result.to),
          transactionIndex: this.convertHexToInt(
            this.remove0x(result.transactionIndex as string)
          ),
          value:
            this.convertHexToInt(this.remove0x(result.value as string)) /
            Math.pow(10, 18),
          type: this.remove0x(result.type),
          v: result.v,
          r: result.r,
          s: result.s,
        };
        return resultData;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
}
