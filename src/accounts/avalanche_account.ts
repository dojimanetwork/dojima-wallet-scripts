import { Balance } from "@xchainjs/xchain-client";
import { assetToString, baseToAsset } from "@xchainjs/xchain-util";
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
        let assetAmount = balance
       await balance.forEach((bal: Balance) => {
            console.log(`${assetToString(bal.asset)} = ${bal.amount.amount()}`)
          })
        //   console.log(assetAmount)
        //   return balance
    }
}