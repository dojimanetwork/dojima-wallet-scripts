import { Client, defaultAvaxParams } from "@xchainjs/xchain-avax"
import { Network } from "@xchainjs/xchain-client"
import { NetworkType } from "./network";
import {  Asset, Chain  } from "@xchainjs/xchain-util"


export class AvalancheConnection{
    _network: NetworkType;
    _client:Client
    _mnemonic:string
    constructor(network:NetworkType,mnemonic:string){
        this._network=network
        this._mnemonic = mnemonic
        if(this._network === "testnet"){
            defaultAvaxParams.network = Network.Testnet
        }
        else if(this._network === "devnet"){           
             defaultAvaxParams.network = Network.Stagenet
        }
        else{
            defaultAvaxParams.network = Network.Mainnet
        }
        defaultAvaxParams.phrase = this._mnemonic;
         this._client = new Client(defaultAvaxParams)
        // console.log(defaultAvaxParams)
    }
    // Create new Avax Asset 

}


