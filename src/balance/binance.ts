import { BinanceConnection } from "../types/interfaces/binance_connections";
import { NetworkType } from "../types/interfaces/network";

export default class Binace extends BinanceConnection {
    constructor(network: NetworkType) {
      super();
    }
  
    async getBalance(address: string): Promise<number> {
      const balance = await this._client.getBalance(address);
      return balance;
    }
}