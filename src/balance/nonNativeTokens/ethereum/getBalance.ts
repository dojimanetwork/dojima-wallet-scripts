import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { contractAddress,tokens,minABI } from "./utils";
export default class Erc20TokenBalance  {
  _provrider: string;
  _web3Client: Web3;
  constructor(provider: string) {
    this._provrider = provider;
    this._web3Client = new Web3(this._provrider);
  }

  async getBalance(token: tokens, walletAddress: string) {
    const contract = new this._web3Client.eth.Contract(
      minABI as AbiItem[],
      contractAddress[token]
    );
    const weiBalance = await contract.methods.balanceOf(walletAddress).call();

    const balance = this._web3Client.utils.fromWei(weiBalance); 

    return balance;
  }
}
