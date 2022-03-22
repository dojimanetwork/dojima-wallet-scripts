// import Wallet from "ethereumjs-wallet";
// import Web3 from "web3";
import * as ethers from "ethers";
// import { EthereumWeb3 } from "../types/interfaces/ethereum_web3";
import { NetworkType } from "../types/interfaces/network";
import BigNumber from "bignumber.js";
// import { SignedTransaction } from "web3-eth-accounts";
import { TransactionConfig } from "web3-core";
import EthereumAccount from "../accounts/eth_account";

// export default async function EthereumChain() {
//     // // Ganache local enviroment
//     // const web3 = new Web3('http://localhost:7545');
//     // const accounts = await web3.eth.getAccounts();
//     // console.log('Account details', accounts);

//     // const balance = await web3.eth.getBalance(accounts[0]);
//     // console.log('Balance in gwei is : ', balance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
//     // console.log('Balance in Eth is : ', web3.utils.fromWei(balance));     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

//     // const transaction = await web3.eth.accounts.signTransaction({
//     //     from: accounts[0],
//     //     to: accounts[1],
//     //     value: web3.utils.toWei('0.05', 'ether'),         // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
//     //     gas: 21000              // Minimum / base gas fee is 21,000
//     // }, 'dbd9beb787980ec5b0f3406faf3b1faaaf004a6c5660a757ac8e86818fed0196' );
//     // console.log('Transaction : ', transaction);

//     // const transactionResult = await web3.eth.sendSignedTransaction(transaction.rawTransaction as string);
//     // console.log('Transaction details : ', transactionResult);

//     const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/f37faaf5ddeb4e589d6f26300ed673a6'));
//     const pubKey = '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4';
//     const prvtKey = 'ae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0';

//     const balance = await web3.eth.getBalance(pubKey);
//     console.log('Balance in gwei is : ', balance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
//     console.log('Balance in Eth is : ', web3.utils.fromWei(balance));     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

//     const transaction = await web3.eth.accounts.signTransaction({
//         from: pubKey,
//         to: '0x46Bd84009D313c34f94bC883C353f72D3453A5B9',
//         value: web3.utils.toWei('0.005', 'ether'),         // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
//         gas: 21000              // Minimum / base gas fee is 21,000
//     }, prvtKey );
//     console.log('Transaction : ', transaction);

//     const transactionResult = await web3.eth.sendSignedTransaction(transaction.rawTransaction as string);
//     console.log('Transaction details : ', transactionResult);

// }

export default class EthereumChain extends EthereumAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getBalance(): Promise<number> {
    const gweiBalance = await this._web3.eth.getBalance(this.getAddress());
    // console.log('Balance in gwei is : ', gweiBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    const ethBalance = this._web3.utils.fromWei(gweiBalance);
    // console.log('Balance in Eth is : ', ethBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    return Number(ethBalance);
  }

  // Calculate 'gasFee' based on multiplier
  calculateFee(baseGasFee: number, multiplier: number): number {
    const fee = new BigNumber(baseGasFee)
      .times(new BigNumber(multiplier))
      .toNumber();
    return fee;
  }

  // Calculate gasFee required for transaction
  async getGasFee() {
    const baseGasFee = await this._web3.eth.getGasPrice();
    return {
      slow: {
        fee: this.calculateFee(parseFloat(baseGasFee), 1),
      },
      average: {
        fee: this.calculateFee(parseFloat(baseGasFee), 1.5),
      },
      fast: {
        fee: this.calculateFee(parseFloat(baseGasFee), 2),
      },
    };
  }

  // Create transaction details based on user input
  createTransaction(
    toAddress: string,
    amount: number,
    feeRate: number
  ) {
    let rawTxDetails = {
      from: this.getAddress(),
      to: toAddress,
      value: this._web3.utils.toWei(amount.toString(), "ether"), // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
      gas: 21000, // Minimum / base gas fee is 21,000
      gasPrice: Math.round(feeRate),
    };
    // console.log('Raw Transaction : ', rawTxDetails);
    return rawTxDetails;
  }

  async signAndSend(rawTxDetails: TransactionConfig) {
    const wallet = ethers.Wallet.fromMnemonic(this._mnemonic);
    const pvtKey = wallet.privateKey;
    const transaction = await this._web3.eth.accounts.signTransaction(
      rawTxDetails,
      pvtKey
    );
    // console.log('Transaction : ', transaction);

    const transactionResult = await this._web3.eth.sendSignedTransaction(
      transaction.rawTransaction as string
    );
    console.log('Transaction details : ', transactionResult);
    return transactionResult.transactionHash;
  }

  // async getTransactionDetails(txID: string, web3: Web3) {
  //   let details = await web3.eth.getTransactionReceipt(txID);
  //   let time = (await web3.eth.getBlock(12058859)).timestamp;
  //   var dateAndTime = new Date(time as number * 1000);
  //   console.log(dateAndTime);
  //   var year = dateAndTime.getFullYear();
  //   var month = dateAndTime.getMonth()+1;
  //   console.log(month);
  //   var date = dateAndTime.getDate();
  //   var hour = dateAndTime.getHours();
  //   var min = dateAndTime.getMinutes();
  //   var sec = dateAndTime.getSeconds();
  //   var result = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  //   let blocks = await web3.eth.getBlock(12083831);
  //   console.log(result);
  //   return {details, time};
  // }

  // async createTransactionAndSend(toAddress: string, amount: number, web3: Web3) {
  //     // const gasFee = await web3.eth.estimateGas({to: toAddress, value: web3.utils.toWei(amount.toString(), 'ether')});
  //     // console.log('Gas fee : ', gasFee);
  //     // const gasPrice = await web3.eth.getGasPrice();
  //     // console.log('Gas Price : ', gasPrice);
  //     // console.log('Gas price values : ', await this.getGasFee(web3));
  //     const transaction = await web3.eth.accounts.signTransaction({
  //         from: this._pubKey,
  //         to: toAddress,
  //         value: web3.utils.toWei(amount.toString(), 'ether'),         // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
  //         gas: 21000              // Minimum / base gas fee is 21,000
  //     }, this._pvtKey);
  //     console.log('Transaction : ', transaction);

  //     const transactionResult = await web3.eth.sendSignedTransaction(transaction.rawTransaction as string);
  //     console.log('Transaction details : ', transactionResult);
  //     return {
  //         transaction,
  //         transactionResult
  //     };
  // }
}
