import { BinanceConnection } from "../types/interfaces/binance_connections";
import { NetworkType } from "../types/interfaces/network";

import {
    Balance as BinanceBalance,
}from "../util/binance";

export default class BinanceAccount extends BinanceConnection {
    constructor(network:NetworkType) {
        super(network);
    }

     getAddress(mnemonic: string) {
        const account =  this._client.recoverAccountFromMnemonic(mnemonic);
        return account.address;
    }
    
     async getBalance(address: string){
        const balances:BinanceBalance[] =await this._client.getBalance(address);
        return balances[0].free
        
      }
}