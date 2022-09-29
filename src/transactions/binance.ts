import axios from "axios";
import BinanceAccount from "../accounts/binance_account";
import BinanceChain from "../balance/binance";
import { BinanceConnection } from "../types/interfaces/binance_connections";
import { NetworkType } from "../types/interfaces/network";
import { BnbGetTranscationHistroyArray, BnbGetTranscationHistroyFinalResult, TransactionParam } from "../util/binance";

// export const api = {
//     getTransactions: "/api/v1/transactions",
//     getTxs: "/bc/api/v1/txs",
//     getTx: "/api/v1/tx",
//   }

export default class BinanceTx extends BinanceChain{
    constructor(network: NetworkType) {
        super(network);
      }

      async getTxData(hash:string){
        console.log("enter")
        try {
          let response = (await axios.get(`${this._clientUrl}/api/v1/tx/${hash}?format=json`));
          // let response = (await axios.get(`requestUrl?format=json`)).data;
          if (response.status && response.status === 200) {
            let result = response.data
              const finalResult = {
                hash : result.hash,
                blockNumber: result.height,
                type: result.tx.value.msg[0].type,
                memo: result.tx.value.memo,
                from: result.tx.value.msg[0].value.inputs[0].address,
                amount:result.tx.value.msg[0].value.inputs[0].coins[0].amount,
                asset:result.tx.value.msg[0].value.inputs[0].coins[0].denom,
                to:result.tx.value.msg[0].value.outputs[0].address,
                signature: result.tx.value.signatures[0].signature
            }
            console.log("final - ",finalResult);
            return finalResult 
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Something went wrong");
        }
      }
      
      async getTranscations(params:TransactionParam){
        let requestUrl = `${this._clientUrl}/api/v1/transactions?address=${params.address}`;
        if(params.endTime){
          requestUrl += `&endTime=${params.endTime}`
        }
        if(params.startTime){
          requestUrl += `&startTime=${params.startTime}`
        }
        if(params.limit){
          requestUrl += `&limit=${params.limit}`
        }else{
          requestUrl += `&limit=2`
        }
        if(params.offset){
          requestUrl += `&endTime=${params.offset}`
        }
        console.log("transction")
        try {
          let response = await axios.get(requestUrl);
          console.log("respone - ", response.status);
          if (response.status && response.status === 200) {
            let result  = response.data;
            if (result.tx.length > 0) {
              const txsResult :BnbGetTranscationHistroyArray[] =result.tx 
              const finalResult :BnbGetTranscationHistroyFinalResult= {
               txs: txsResult.map((res) => ({
                  txHash: res.txHash,
                  blockHeight: res.blockHeight,
                  fromAddr:res.fromAddr,
                  toAddr:res.toAddr,
                  value:res.value,
                  timeStamp:res.timeStamp,
                  txAssest:res.txAssest,
                  txFee:res.txFee,
                  txType:res.txType
                })),
              };
              console.log("hello - ",finalResult);

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
      
}