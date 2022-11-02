import { Network } from "@xchainjs/xchain-client";
import {Client}  from "@xchainjs/xchain-cosmos";
import { NetworkType } from "./network";

export class CosmosConnection{
    _network: Network;
    _client:Client
    constructor(network:NetworkType,mnemonic:string){
        let phrase = mnemonic
        if(network === "testnet" || network === "devnet"){
           this._network = Network.Testnet
        }
        else{
            this._network= Network.Mainnet
        }
         this._client = new Client({network:this._network, phrase})
    }
}