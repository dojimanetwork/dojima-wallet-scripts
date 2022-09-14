import { assetFromString, Chain, AssetBNB, assetToBase, assetAmount } from "@xchainjs/xchain-util";
import axios from "axios";
import { signature } from "bitcoinjs-lib/src/script";
import { map } from "lodash";
import binance from "../balance/binance";
import transaction from "../core/bitcoin/transaction";
import { BinanceConnection } from "../types/interfaces/binance_connections";
import { NetworkType } from "../types/interfaces/network";

import {
    Balance,
    Balance as BinanceBalance,
    BnbGetTranscationHistroyArray,
    BnbGetTranscationHistroyArrayResult,
    BnbGetTranscationHistroyFinalResult,
    BnbGetTransctionData,
    TransactionParam,
    TransctionDetails 
}from "../util/binance";

export const api = {
  getTransactions: "/api/v1/transactions",
  getTxs: "/bc/api/v1/txs",
  getTx: "/api/v1/tx",
}
export default class BinanceAccount extends BinanceConnection {

    constructor() {
        super();
    }

    async getAddress(mnemonic: string) {
        const account = await this._client.recoverAccountFromMnemonic(mnemonic);
        return account;
    }
     async getBalance(address: string): Promise<Balance[]> {
        const balances:BinanceBalance[] =await this._client.getBalance(address);
        return balances
        
      }
      async transfer(amount:number,recepient:string,mnemonic:string,assest:string,memo?:string){
        await this._client.initChain()
        const from = await this.getAddress(mnemonic);
        await this._client.setPrivateKey(from.privateKey)
        const fromadd = from.address
        const txhash =await this._client.transfer(fromadd,recepient,amount,assest,memo?memo:undefined)
        return txhash;
      }
    //    async getTx(hash:string){
    //       // const data = await this._httpClient.request("get", `${api.getTx}/${hash}`)
    //       // return data
    //       // const transaction = await this._client.getTxs("tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va",1662229800000,1662654105424)
    //     const clientUrl = `https://testnet-dex.binance.org/api/v1/transactions`
    // const url = new URL(clientUrl)
    //  url.searchParams.set('address', "tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va")
    //  await this._client.initChain()
    //  try {
    //   const response = await this._client.getTr
    //   console.log(response.data);

    //   // return response.data
    // } catch (error) {
    //   return Promise.reject(error)
    // }
    //    }
    // https://testnet-dex.binance.org/api/v1/transactions?address=tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va&startTime=1662229800000&endTime=1662656072494&limit=6&offset=2

      async getTranscations(params:TransactionParam){
        let requestUrl = `https://testnet-dex.binance.org/api/v1/transactions?address=${params.address}`;
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
              const txsResult :BnbGetTranscationHistroyArrayResult[] =result.tx
              const finalResult :BnbGetTranscationHistroyFinalResult= {
                tx: result.map((res) => ({
                  txHash: res.txHash,
                  blockHeight: res.blockHeight,
                })),
              };
              console.log("hello - ",finalResult);

              return finalResult;
            } else {
              return {
                txs: [],
              };
            }
            console.log("hi -",result)
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Something went wrong");
        }

      }
      
    async getTxData(hash:string){
      console.log("enter")
      try {
        let response = (await axios.get(`https://testnet-dex.binance.org/api/v1/tx/${hash}?format=json`));
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
        console.log(error)
        throw new Error("Something went wrong");
      }
            

    }
  
}