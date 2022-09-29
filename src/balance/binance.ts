import { BinanceConnection } from "../types/interfaces/binance_connections";
import { NetworkType } from "../types/interfaces/network";
import Big, { BigSource } from "big.js"
import * as crypto from "@binance-chain/javascript-sdk/lib/crypto"
import { BASENUMBER, checkNumber } from "@binance-chain/javascript-sdk/lib/utils";
import { AminoPrefix } from "@binance-chain/javascript-sdk/lib/types";
import { Transaction } from "@binance-chain/javascript-sdk";
import BinanceAccount from "../accounts/binance_account";


export default class BinanceChain extends BinanceAccount {
    constructor(network: NetworkType) {
      super(network);
    }
    async transfer(amount:number,recepient:string,mnemonic:string,assest:string,memo?:string){
      await this._client.initChain()
      const fromAccount =  this._client.recoverAccountFromMnemonic(mnemonic);
      await this._client.setPrivateKey(fromAccount.privateKey)
      const fromadd = fromAccount.address
      const txhash =await this._client.transfer(fromadd,recepient,amount,assest,memo?memo:undefined)
      console.log(txhash);
      return txhash;
    }

    async createTranscation(amount:BigSource,recepient:string,mnemonic:string,assest:string,memo?:string,sequence: number | null = null
      ){
      await this._client.initChain()
      const fromAccount =  this._client.recoverAccountFromMnemonic(mnemonic);
      await this._client.setPrivateKey(fromAccount.privateKey)
      const fromadd = fromAccount.address
      const accCode = crypto.decodeAddress(fromadd)
    const toAccCode = crypto.decodeAddress(recepient)

    amount = new Big(amount)
    amount = Number(amount.mul(BASENUMBER).toString())

    checkNumber(amount, "amount")

    const coin = {
      denom: assest,
      amount: amount,
    }

    const msg = {
      inputs: [
        {
          address: accCode,
          coins: [coin],
        },
      ],
      outputs: [
        {
          address: toAccCode,
          coins: [coin],
        },
      ],
      aminoPrefix: AminoPrefix.MsgSend,
    }

    const signMsg = {
      inputs: [
        {
          address: fromadd,
          coins: [
            {
              amount: amount,
              denom: assest,
            },
          ],
        },
      ],
      outputs: [
        {
          address: recepient,
          coins: [
            {
              amount: amount,
              denom: assest,
            },
          ],
        },
      ],
    }

    const signedTx = await this._client._prepareTransaction(
      msg,
      signMsg,
      fromadd,
      sequence,
      memo
    );
    // console.log("raw - ",signedTx)
    return signedTx;

    }

    async signAndSend(rawTx:Transaction) {
      const txHash = await this._client._broadcastDelegate(rawTx);
      console.log("raw -",txHash);
      return txHash;
    }
}