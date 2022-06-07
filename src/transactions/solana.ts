import * as web3 from "@solana/web3.js";
import moment from "moment";
import { NetworkType } from "../types/interfaces/network";
import SolanaConnection from "../types/interfaces/solana_connection";
import { SolTxDataResult, SolTxHistoryParams, SolTxsResult } from "./utils";

export default class SolanaTransaction extends SolanaConnection {
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

  async getDetailTransactionData(hash: string, state?: web3.Finality) {
    try {
      let txData = await this._connection.getTransaction(hash, {
        commitment: state ? state : "confirmed",
      });
      if (txData !== null && txData.meta !== null) {
        let amount = txData.meta.postBalances[1] - txData.meta.preBalances[1];
        const resultData: SolTxDataResult = {
          timeStamp: txData.blockTime ? txData.blockTime : 0,
          gasFee: txData.meta.fee / Math.pow(10, 9),
          amount: amount / Math.pow(10, 9),
          status: "",
          block: txData.slot,
          from: txData.transaction.message.accountKeys[0].toString(),
          to: txData.transaction.message.accountKeys[1].toString(),
          recentBlockHash: txData.transaction.message.recentBlockhash,
          instructionData: txData.transaction.message.instructions[0].data,
        };
        return resultData;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getTransactionData(hash: string, address: string, state?: web3.Finality) {
    try {
      // const address = await this.getAddress();
      let txData = await this._connection.getTransaction(hash, {
        commitment: state ? state : "confirmed",
      });
      if (txData !== null && txData.meta !== null) {
        let date = "";
        let time = "";
        let tx_type = "";
        if (txData.blockTime !== (null || undefined)) {
          let dateValue = this.convertTimestampToDate(
            Number(txData.blockTime) * 1000
          );
          date = moment(this.convertISOtoUTC(dateValue)).format("DD/MM/YYYY");
          time = moment(this.convertISOtoUTC(dateValue)).format("HH:mm:ss");
        }
        if(txData.transaction.message.accountKeys[0].toBase58() === address) {
          tx_type = 'Send | SOL';
        } else {
          tx_type = 'Receive | SOL'
        }
        let amount = txData.meta.postBalances[1] - txData.meta.preBalances[1];
        return {
          date: date,
          time: time,
          gas_price: txData.meta.fee / Math.pow(10, 9),
          value: amount / Math.pow(10, 9),
          block: txData.slot,
          from: txData.transaction.message.accountKeys[0].toBase58(),
          to: txData.transaction.message.accountKeys[1].toBase58(),
          transaction_type: tx_type,
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getTransactionsHistory(params: SolTxHistoryParams) {
    try {
      const pubKey = new web3.PublicKey(params.address);
      let signatures = await this._connection.getSignaturesForAddress(
        pubKey,
        {
          limit: params.offset ? params.offset : 100,
          before: params.beforeHash ? params.beforeHash : undefined,
          until: params.untilHash ? params.untilHash : undefined,
        }
      );
      
      const convertTimestampToDate = (timestamp: number) => {
        const date = moment(
          this.convertISOtoUTC(
            this.convertTimestampToDate(timestamp * 1000)
          )
        ).format("DD/MM/YYYY");
        return date;
      };

      const convertTimestampToTime = (timestamp: number) => {
        const date = moment(
          this.convertISOtoUTC(
            this.convertTimestampToDate(timestamp * 1000)
          )
        ).format("HH:mm:ss");
        return date;
      };

      if (signatures !== null) {
        const resultTxs: SolTxsResult = {
          txs: signatures.map((res) => ({
            transaction_hash: res.signature,
            block: res.slot,
            date: (res.blockTime && (res.blockTime !== (null || undefined))) ? convertTimestampToDate(res.blockTime) : '-' ,
            time: (res.blockTime && (res.blockTime !== (null || undefined))) ? convertTimestampToTime(res.blockTime) : '-' ,
          })),
        };
        return resultTxs;
      } else {
        return {
          txs: [],
        };
      }
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
