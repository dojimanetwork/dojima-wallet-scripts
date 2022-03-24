import { AbiItem } from "web3-utils";
import { contractData, tokenList, minABI, BalanceResult } from "./utils";
import EthereumAccount from "../../accounts/eth_account";
import { NetworkType } from "../../types/interfaces/network";

export default class Erc20TokenBalance extends EthereumAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getBalance(token: tokenList, walletAddress?: string): Promise<BalanceResult> {
    const contract = new this._web3.eth.Contract(
      minABI as AbiItem[],
      contractData[`${token}`].contractAddress
    );
    var balance: number =
      (await contract.methods
        .balanceOf(walletAddress ? walletAddress : this.getAddress())
        .call()) / Math.pow(10, contractData[`${token}`].decimal);
    // console.log(balance + " " + contractData[`${token}`].tokenSymbol);
    var result: BalanceResult = {
        balance: balance,
        tokenName: contractData[`${token}`].tokenSymbol
    };
    return result;
  }
}
