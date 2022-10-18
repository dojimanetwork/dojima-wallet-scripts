import { Network } from "@xchainjs/xchain-client";
import { AvalancheTransfer } from "../balance/avalanche_transfer";
import { NetworkType } from "../types/interfaces/network";

export class Avalanche_tx extends AvalancheTransfer{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    }

    async getTxData(hash:string){
        try {
            const txData = await this._client.getTransactionData(hash)
            console.log(`From ${JSON.stringify(txData)}`)
            console.log(txData);
        } catch (error) {
            console.log(`Caught: ${error}`)
        }
    }

    async getTxHistroy(address:string){
        try {
            const txHistory = await this._client.getTransactions({address: address})
            console.log(`Found ${txHistory.total.toString()}`)
            txHistory.txs.forEach(tx => console.log(tx.hash))
        } catch (error) {
            console.log(`Caught: ${error}`)
        }
    }

}