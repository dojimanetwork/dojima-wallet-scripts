import { Tx, TxsPage } from "@xchainjs/xchain-client";
import axios from "axios";
import { chain } from "lodash";
import moment from "moment";
import { AvalancheTransfer } from "../balance/avalanche_transfer";
import { NetworkType } from "../types/interfaces/network";
import { finalTxDataResult } from "../util/avalanche";
import { AvaxTxHistroy, AvaxTxHistroyFinalData, Avax_item } from "./utils";

export class Avalanche_tx extends AvalancheTransfer{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    }

    // async getDetailTransactionData(hash:string){
    //     try {
    //         const txData = await this._client.getTransactionData(hash)
    //        if(txData!= (null || undefined)){
    //         const tranferAmount = txData.from[0].amount.amount().toNumber() / Math.pow(10, txData.from[0].amount.decimal)
    //         console.log(txData)
            
    //         const finalResult ={
    //             from: txData.from[0].from,
    //             to: txData.to[0].to,
    //             amount:tranferAmount,
    //             date: moment(this.convertISOtoUTC(txData.date.toString())).format("DD/MM/YYYY"),
    //             type: txData.type,
    //             hash: txData.hash
    //         }
    //         return finalResult;
    //        }
    //     } catch (error) {
    //         console.log(`Caught: ${error}`)
    //     }
    // }

    async getDetailTranscationData(hash:string){
        try{
            let chain_id = 0;
            if(this._network === "mainnet"){
                chain_id = 43114;
            }
            else{
                chain_id = 43113;
            }
            const requestUrl = `https://api.covalenthq.com/v1/${chain_id}/transaction_v2/${hash}/?&key=ckey_fe06b98414fd474fa595e80c258`
            const response = await axios.get(requestUrl);
            let status ="h";
            if(response.data.data.items[0].successful === true){
                status = "success"
            }
            else{
                status = "fail"
            }
            if(response !== (null || undefined)){
                if(response.data.data.items[0]!== (null|| undefined)){
                    const finalResponse = {
                        from :response.data.data.items[0].from_address,
                        to: response.data.data.items[0].to_address,
                        block:response.data.data.items[0].block_height,
                        hash:response.data.data.items[0].tx_hash,
                        status:status,
                        amount:response.data.data.items[0].value / Math.pow(10, 18),
                        gasFee:response.data.data.items[0].fees_paid/ Math.pow(10, 18),
                        // gasPrice:response.data.data.items[0].gas_price/Math.pow(10,20),
                        gasLimit:response.data.data.items[0].gas_limit,
                    }
                    console.log(finalResponse);
                    return finalResponse;
                }
            }
        }
        catch (error) {
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
    //         const txHis = await this._client.getTransactions({address: address})
    //         // console.log(`Found ${txHistory.total.toString()}`)
    //         // txHistory.txs.forEach(tx => console.log(tx.hash))
    //         let final : finalTxHistory = {
    //             txs: txHistory.map((res) => {
    //             }),
    //             found: ""
    //         }
    //         console.log(txHistory);
    //     } catch (error) {
    //         console.log(`Caught: ${error}`)
    //     }
    // }

    async getTxHistroy(address:string){
        let chain_id = 0;
        if(this._network === "mainnet"){
            chain_id = 43114;
        }
        else{
            chain_id = 43113;
        }
        const requestUrl = `https://api.covalenthq.com/v1/${chain_id}/address/${address}/transactions_v2/?&key=ckey_fe06b98414fd474fa595e80c258`;
        const response = await axios.get(requestUrl);
        const result:AvaxTxHistroyFinalData = response.data;
        if(result !== (null || undefined)){
            const res = result.data
            if(res.items.length>0){
                const txHistroy ={
                    txs:res.items.map((item)=>({
                        date:  moment(this.convertISOtoUTC(item.block_signed_at)).format("DD/MM/YYYY"),
                        block_height: item.block_height,
                        tx_hash : item.tx_hash,
                        from: item.from_address,
                        to :item.to_address,
                        value :Number(item.value)/Math.pow(10,18),
                        gasFee: Number(item.fees_paid)/Math.pow(10,18),
                    }))
                }
                return txHistroy;
            }
        }   
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

}