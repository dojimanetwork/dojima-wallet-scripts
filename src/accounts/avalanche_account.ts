import { baseToAsset } from "@xchainjs/xchain-util";
import { AvalancheConnection } from "../types/interfaces/avalanche_connection";
import { NetworkType } from "../types/interfaces/network";

export class AvalancheAccount extends AvalancheConnection{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    }
    
     getAddress(){
        let address = this._client.getAddress();
        console.log("address - ",address)
        return address
    }

    async getBalance(address:string){
        let balance = await this._client.getBalance(address);
        let isValid =this._client.validateAddress(address)
        if( isValid === true ){
            try {
                const balance = await this._client.getBalance(address)
                let avax_balance = (baseToAsset(balance[0].amount)).amount()
                console.log(`With balance: ${avax_balance}`)
                return avax_balance;
            } catch (error) {
                console.log(`Caught: ${error}`)
            }
    }
  }
}