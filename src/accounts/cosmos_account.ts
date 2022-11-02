import { CosmosConnection } from "../types/interfaces/cosmos_connection";
import { NetworkType } from "../types/interfaces/network";
import { assetToBase, baseToAsset, assetAmount } from "@xchainjs/xchain-util"


export class CosmosAccount extends CosmosConnection{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    }

    getAddress(){
        let address = this._client.getAddress();
        console.log(address);
        return address;
    }

    async getBalance(address:string){
        const balance = await this._client.getBalance(address)
        // let assetAmount = (baseToAsset(balance[0].amount)).amount()
        console.log(` ${(balance[0].amount.amount())}`)
    }
}