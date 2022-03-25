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
//       return new Error(error.message);
//     }
//   }

//   async getTransactionData(txHash: string) {
//     try {
//       const txData = await this._client.getTransactionData(txHash);
//       //   console.log(txData);
//       return txData;
//     } catch (error) {
//       return new Error(error.message);
//     }
//   }
// }

import { NetworkType } from "../types/interfaces/network";
import EthereumAccount from "../accounts/eth_account";
import { get } from "../types/interfaces/http";
import { EthTxDetailsResult, EthTxHashDataResult, TransactionHashDataResult, TransactionHistoryResult, TxHashDataParams, TxHistoryParams } from "./utils";

export default class EthereumTransactions extends EthereumAccount {
  _api: string;
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
    if (network === "mainnet" || network === "devnet") {
      this._api = "https://api.etherscan.io/api";
    } else if (network === "testnet") {
      this._api = "https://api-ropsten.etherscan.io/api";
    }
  }

  async getTransactionsHistory(params: TxHistoryParams) {
    let requestApi = `${this._api}?module=account&action=${
      params.action
    }&address=${this.getAddress()}&startblock=${
      params.startBlock ? params.startBlock : 0
    }&endblock=${params.endBlock ? params.endBlock : 99999999}&page=${
      params.page ? params.page : 1
    }&offset=${params.limit ? params.limit : 10}&sort=${
      params.sort ? params.sort : "desc"
    }&api=6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C`;

    try {
      let response = await (
        await get(requestApi, {
          method: "GET",
          redirect: "follow",
        })
      ).text();

      let parsedData: TransactionHistoryResult = JSON.parse(response);
      let result: EthTxDetailsResult[] = parsedData.result;
      return {
        txs: (result || []).map((res) => ({
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
    } catch (error) {
      return new Error(error.message);
    }
  }

  remove0x(string: string) {
    if (string.startsWith("0x")) {
      const removed0xString = string.substring(2);
      return removed0xString;
    }
  }

  convertHexToInt(hexValue: string) {
    const intValue = parseInt(hexValue, 16);
    return intValue;
  }

  async getTransactionData(params: TxHashDataParams) {
    let requestApi = `${this._api}?module=proxy&action=${params.action}&txhash=${params.hash}&api=${params.apiKey}`;

    try {
      let response = await (
        await get(requestApi, {
          method: "GET",
          redirect: "follow",
        })
      ).text();
      let parsedData: TransactionHashDataResult = JSON.parse(response);
      let result: EthTxHashDataResult = parsedData.result;
      return {
        blockHash: result.blockHash,
        blockNumber: this.convertHexToInt(this.remove0x(result.blockNumber)),
        from: this.remove0x(result.from),
        gas: this.convertHexToInt(this.remove0x(result.gas)),
        gasPrice:
          this.convertHexToInt(this.remove0x(result.gasPrice)) /
          Math.pow(10, 18),
        hash: result.hash,
        input: this.remove0x(result.input),
        nonce: this.convertHexToInt(this.remove0x(result.nonce)),
        to: this.remove0x(result.to),
        transactionIndex: this.convertHexToInt(
          this.remove0x(result.transactionIndex)
        ),
        value:
          this.convertHexToInt(this.remove0x(result.value)) / Math.pow(10, 18),
        type: this.remove0x(result.type),
        v: result.v,
        r: result.r,
        s: result.s,
      };
    } catch (error) {
      return new Error(error.message);
    }
  }
}
