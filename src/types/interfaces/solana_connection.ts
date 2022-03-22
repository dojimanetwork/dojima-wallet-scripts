import * as web3 from "@solana/web3.js";
import { NetworkType } from "./network";

export default class SolanaConnection {
  _mnemonic: string;
  _network: NetworkType;
  _cluster: web3.Cluster;
  _connection: web3.Connection;
  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this._network = network;
    if (this._network === "devnet" || this._network === "testnet") {
      this._cluster = "devnet";
    } else{
      this._cluster = "mainnet-beta";
    }
    this._connection = new web3.Connection(
      web3.clusterApiUrl(this._cluster),
      "confirmed"
    );
  }
}
