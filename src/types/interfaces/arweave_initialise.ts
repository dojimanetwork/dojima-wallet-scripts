import Arweave from "arweave";
// import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
import { NetworkType } from "./network";

export default class ArweaveInitialise {
  public _arweave: Arweave;
  _network: NetworkType;

  constructor(network: NetworkType) {
    this._network = network;
    if (this._network === "testnet" || this._network === "devnet") {
      // Testnet
      this._arweave = Arweave.init({
        host: "localhost",
        port: "1984",
        protocol: "http",
        timeout: 100000,
      });
    } else {
      // Mainnet
      this._arweave = Arweave.init({
        host: "arweave.net",
        protocol: "https",
        timeout: 100000,
      });
    }
  }
}
