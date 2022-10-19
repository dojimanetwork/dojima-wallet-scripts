import { Tx } from "@xchainjs/xchain-client";
import moment from "moment";
import { AvalancheTransfer } from "../balance/avalanche_transfer";
import { NetworkType } from "../types/interfaces/network";
import { finalTxDataResult } from "../util/avalanche";

export class Avalanche_tx extends AvalancheTransfer{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    }

    async getDetailTransactionData(hash:string){
        try {
            const txData = await this._client.getTransactionData(hash)
           if(txData!= (null || undefined)){
            const tranferAmount = txData.from[0].amount.amount().toNumber() / Math.pow(10, txData.from[0].amount.decimal)
            console.log(txData)
            
            const finalResult ={
                from: txData.from[0].from,
                to: txData.to[0].to,
                amount:tranferAmount,
                date: moment(this.convertISOtoUTC(txData.date.toString())).format("DD/MM/YYYY"),
                type: txData.type,
                hash: txData.hash
            }
            return finalResult;
           }
        } catch (error) {
            console.log(`Caught: ${error}`)
        }
    }

    async getTransactionData(hash:string,address:string){
        try {
            const txData:Tx= await this._client.getTransactionData(hash)
           if(txData!= (null || undefined)){
            const tranferAmount = txData.from[0].amount.amount().toNumber() / Math.pow(10, txData.from[0].amount.decimal)
            console.log(txData)
            let tx_type :string;
            if(txData.from[0].from === address){
                tx_type = "SEND | AVAX"
            }
            else{
                tx_type = "RECEIVE | AVAX"
            }
            const finalResult:finalTxDataResult ={
                from: txData.from[0].from,
                to: txData.to[0].to,
                amount:tranferAmount,
                date: moment(this.convertISOtoUTC(txData.date.toString())).format("DD/MM/YYYY"),
                transaction_type: tx_type,
                hash: txData.hash
            }
            console.log(finalResult)
            return finalResult;
           }
        } catch (error) {
            console.log(`Caught: ${error}`)
        }
    }


    // async getTxHistroy(address:string){
    //     try {
    //         const txHistory = await this._client.getTransactions({address: address})
    //         // console.log(`Found ${txHistory.total.toString()}`)
    //         // txHistory.txs.forEach(tx => console.log(tx.hash))
    //     } catch (error) {
    //         console.log(`Caught: ${error}`)
    //     }
    // }

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

}