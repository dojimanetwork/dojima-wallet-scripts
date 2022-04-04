import { get } from "../types/interfaces/http";
import { NetworkType } from "../types/interfaces/network";
import {
  BinanaceTxDetailsResult,
  BinanceChainTxHistory,
  BinanceTransactionHistoryResult,
} from "./utils";
export default class BinanceTransaction {
  _api: string;
  constructor(mnemonic: string, network: NetworkType) {
    if (network === "mainnet" || network === "devnet") {
      this._api = "https://dex.binance.org/api/v1/transactions";
    } else {
      this._api = "https://testnet-explorer.binance.org";
    }
  }
  async getBinanceChainTransactionHistory(params: BinanceChainTxHistory) {
    let requestApi = `${this._api}?address=${params.fromAddress}`;
    try {
      let response = await (
        await get(requestApi, {
          method: "GET",
          redirect: "follow",
        })
      ).text();
      console.log("Response: ", response);
      let parsedData: BinanceTransactionHistoryResult = JSON.parse(response);
      let result: BinanaceTxDetailsResult[] = parsedData.tx;
      return {
        txs: (result || []).map((res) => ({
          txHash: res.txHash,
          blockHeight: res.blockHeight,
          txType: res.txType,
          timeStamp: new Date(Number(res.timeStamp) * 1000),
          fromAddress: res.fromAddr,
          toAddr: res.toAddr,
          txFee: Number(res.txFee),
          proposalId: res.proposalld,
          code: res.code,
          data: res.data,
          confirmBlocks: res.confimrblocks,
          memo: res.memo,
          source: res.source,
          sequence: Number(res.sequence),
        })),
      };
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
