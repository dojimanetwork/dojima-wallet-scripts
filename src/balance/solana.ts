import * as web3 from "@solana/web3.js";
import { NetworkType } from "../types/interfaces/network";
// import { SolanaConnection } from "../types/interfaces/solana_connection";
import SolanaAccount from "../accounts/solana_account";
import CoinGecko from "../assets_stats/coinGecko/assets_data";
import { GasfeeResult } from "./utils";

export default class SolanaChain extends SolanaAccount {
  _mnemonic: string;
  constructor(mnemonic: string, network: NetworkType) {
    super(network);
    this._mnemonic = mnemonic;
  }

  async getBalance(pubAddress: string): Promise<number> {
    // Get account details
    const pubKey = new web3.PublicKey(pubAddress);

    // Retrieve user token balance
    let balance = await this._connection.getBalance(pubKey);
    balance = balance / Math.pow(10, 9);
    // console.log('Balance is : ', balance);
    return balance;
  }

  // Get recent block hash for calculating gas fee
  async getRecentBlockHash() {
    const blockHash = await this._connection.getRecentBlockhash();
    // console.log("Block Hash is : ", blockHash);
    return blockHash;
  }

  // Calculate Gas fee based in recent block hash
  async getFees(): Promise<GasfeeResult> {
    const { feeCalculator } = await this.getRecentBlockHash();
    // return {
    //   slow: {
    //     fee: (feeCalculator.lamportsPerSignature / Math.pow(10, 9)),
    //   },
    //   average: {
    //     fee: (feeCalculator.lamportsPerSignature / Math.pow(10, 9)),
    //   },
    //   fast: {
    //     fee: (feeCalculator.lamportsPerSignature / Math.pow(10, 9)),
    //   },
    // };
    const sol_gasFee = feeCalculator.lamportsPerSignature / Math.pow(10, 9);
    const pricesInst = new CoinGecko();
    const pricesData = await pricesInst.getAssestsCurrentMarketData({
      assets: "solana",
    });
    if (pricesData !== undefined) {
      const usdt_gasFee = sol_gasFee * pricesData.current_price;
      const resultFee = {
        fee: {
          asset_fee: sol_gasFee,
          usdt_fee: usdt_gasFee,
        },
      };
      return {
        slow: resultFee,
        average: resultFee,
        fast: resultFee,
      };
    } else {
      throw new Error("Unable to retrieve current asset-usdt price");
    }
  }

  // Create transaction details based on user input
  async createTransaction(
    toAddress: string,
    amount: number
  ): Promise<web3.Transaction> {
    // Get account address
    const pubKey = new web3.PublicKey(await this.getAddress(this._mnemonic));

    // Convert toAddress string to PublicKey
    const to = new web3.PublicKey(toAddress);

    const toAmount = Math.floor(amount * Math.pow(10, 9));
    // console.log('To Amount : ' , toAmount);

    // Add transaction for the required amount
    let rawTx = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: to,
        lamports: toAmount,
      })
    );

    return rawTx;
  }

  async signAndSend(rawTx: web3.Transaction): Promise<string> {
    // Get account details
    const account = await this.getKeypair(this._mnemonic);

    // Sign the transaction
    let signature = await web3.sendAndConfirmTransaction(
      this._connection,
      rawTx,
      [account[0]]
    );
    // console.log('Transaction details: ', JSON.stringify(transaction));
    // console.log('Transaction hash : ', signature);

    return signature;
  }

  // async createTransactionAndSend(toAddress: string, amount: number, connection: web3.Connection) {
  //   // Get account details
  //   const account = await new SolanaAccount(this._mnemonic).solAcc();
  //   const pubKey = new web3.PublicKey(account[0].publicKey.toString());

  //   // Convert toAddress string to PublicKey
  //   const to = new web3.PublicKey(toAddress);

  //   const toAmount = amount * Math.pow(10, 9);
  //   // console.log('To Amount : ' , toAmount);

  //   // Add transaction for the required amount
  //   let transaction = new web3.Transaction().add(
  //     web3.SystemProgram.transfer({
  //       fromPubkey: pubKey,
  //       toPubkey: to,
  //       lamports: toAmount,

  //     })
  //   );

  //   // Sign the transaction
  //   let signature = await web3.sendAndConfirmTransaction(
  //     connection,
  //     transaction,
  //     [account[0]]
  //   );
  //   // console.log('Transaction details: ', JSON.stringify(transaction));
  //   // console.log('Transaction hash : ', signature);

  //   return {
  //     signature,
  //     transaction
  //   };
  // }
}
