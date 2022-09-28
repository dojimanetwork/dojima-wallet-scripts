
import {BncClient} from "@binance-chain/javascript-sdk";
import { NetworkType } from './network';

export class BinanceConnection {
    _client : BncClient;
    _network: NetworkType;

    constructor(network:NetworkType){
        this._network =network;
        if(network === "mainnet"){
          this._client =new BncClient("https://testnet-dex.binance.org/");
        }
        else{
          this._client =new BncClient("https://testnet-dex.binance.org/");
        }
    }
}

