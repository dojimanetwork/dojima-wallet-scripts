import BtcClient from "../types/interfaces/bitcoin_client";
import { BtcRawTransactionResult } from "../core/btc";
import { NetworkType } from "../types/interfaces/network";
import CoinGecko from "../assets_stats/coinGecko/assets_data";
import { GasfeeResult } from "./utils";

export default class BitcoinChain extends BtcClient {
  constructor(network: NetworkType) {
    super(network);
  }

  async getBalance(address: string): Promise<number> {
    const balance = await this._client.getBalance(address);
    return balance;
  }

  async getGasFee(
    amount: number,
    mnemonic: string,
    feeRate: number,
    to?: string,
    memo?: string
  ): Promise<GasfeeResult> {
    const from: string = this._client.getAddress(mnemonic);
    try {
      const rawTxDetails: BtcRawTransactionResult = await this._client.createTransaction(
        amount,
        from,
        to ? to : 'tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp',
        mnemonic,
        feeRate,
        memo ? memo : undefined,
      );
      const btc_gasFee = rawTxDetails.gas_fee;
      const pricesInst = new CoinGecko();
      const pricesData = await pricesInst.getAssestsCurrentMarketData({
        assets: 'bitcoin'
      });
      if(pricesData !== undefined) {
        const usdt_gasFee = btc_gasFee * pricesData.current_price;
        const resultFee = {
          fee: {
            asset_fee: btc_gasFee,
            usdt_fee: usdt_gasFee
          }
        }
        return { 
          slow: resultFee,
          average: resultFee,
          fast: resultFee
        };
      } else {
        throw new Error("Unable to retrieve current asset-usdt price");
      }
    } catch (error) {
      if (error instanceof Error) {
        if(error.message === 'No utxos to send') {
          // console.log('Entered if else');
          const from: string = this._client.getAddress(process.env.SAMPLE_SEED_PHRASE as string);
          const rawTxDetails: BtcRawTransactionResult = await this._client.createTransaction(
            amount,
            from,
            to ? to : 'tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp',
            process.env.SAMPLE_SEED_PHRASE as string,
            feeRate,
            memo ? memo : undefined,
          );
          const btc_gasFee = rawTxDetails.gas_fee;
          const pricesInst = new CoinGecko();
          const pricesData = await pricesInst.getAssestsCurrentMarketData({
            assets: 'bitcoin'
          });
          if(pricesData !== undefined) {
            const usdt_gasFee = btc_gasFee * pricesData.current_price;
            const resultFee = {
              fee: {
                asset_fee: btc_gasFee,
                usdt_fee: usdt_gasFee
              }
            }
            return { 
              slow: resultFee,
              average: resultFee,
              fast: resultFee
            };
          } else {
            throw new Error("Unable to retrieve current asset-usdt price");
          }
        } else {
          // ✅ TypeScript knows err is Error
          throw new Error(error.message);
        }
      } else {
        throw new Error("Unexpected error");
      }
    }
  }

  async rawTransaction(
    amount: number,
    mnemonic: string,
    to: string,
    feeRate: number,
    memo?: string
  ): Promise<BtcRawTransactionResult> {
    const from: string = this._client.getAddress(mnemonic);
    const rawTxDetails: BtcRawTransactionResult = await this._client.createTransaction(
      amount,
      from,
      to,
      mnemonic,
      feeRate,
      memo ? memo : undefined,
    );
    return rawTxDetails;
  }

  async transfer(txHex: string): Promise<string> {
    const txHash = await this._client.transfer(txHex);
    return txHash;
  }
}

// import {
//   generatePhrase,
//   getSeed,
//   validatePhrase,
// } from "@xchainjs/xchain-crypto";
// import * as bip39 from "bip39";
// import { Client } from "@xchainjs/xchain-bitcoin";
// import { Balance, FeeRates, FeesWithRates } from "@xchainjs/xchain-client";
// import { AssetBTC, baseAmount } from "@xchainjs/xchain-util";
// import { BigNumber } from "bignumber.js";
// // import BitcoinClient from "../types/interfaces/bitcoin_client";
// import BitcoinAccount from "../accounts/bitcoin_account";
// import { NetworkType } from "../types/interfaces/network";

// export default async function BitcoinChain1(mnemonic: string) {

//     // const mnemonic = bip39.generateMnemonic();
//     // console.log('Mnemonic 12 : ', mnemonic);
//     // const mnemonic24 = bip39.generateMnemonic(256);
//     // console.log('Mnemonic 24 : ', mnemonic24);
//     // const seed = getSeed(mnemonic);
//     // console.log('Seed is : ', seed);
//     // const is_valid = validatePhrase(mnemonic);
//     // console.log('valid 12 : ', is_valid);
//     // const is_valid_24 = validatePhrase(mnemonic24);
//     // console.log('valid 24 : ', is_valid_24);

//     const client = new Client({phrase: mnemonic});
//     console.log('Client details : ', client);

//     // const address = client.getAddress();
//     // console.log('Address is : ', address);
//     // console.log('Explorer Url is : ', client.getExplorerUrl());
//     // console.log('Explorer Address Url is : ', client.getExplorerAddressUrl(address));
//     // const is_address_valid = client.validateAddress('tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp');
//     // console.log('Address is : ', is_address_valid);
//     let balance = await client.getBalance(client.getAddress());
//     console.log('Balance is : ', balance);
//     balance.map((data: Balance)=>{
//         const { asset, amount } = data;
//         console.log('Assets : ', asset.chain);
//         console.log('Amounts : ', (amount.amount().toNumber() / Math.pow(10, amount.decimal)));
//     })
//     const toAmount = baseAmount(1000, 8);
//     console.log('Asset amount : ', toAmount);
//     console.log('Asset amount : ', (toAmount.amount().toNumber() / Math.pow(10, toAmount.decimal)));
//     const transactionHash = await client.transfer({
//         walletIndex: 0,
//         asset: AssetBTC ,
//         recipient: 'tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny',
//         amount: toAmount,
//         memo: 'SWAP:BTC.BTC',
//         feeRate: 1
//     });

//     console.log('Transaction id : ', transactionHash);

//     // if(transaction !== null){
//         try {
//             const transactionDetails = await client.getTransactionData(transactionHash);
//             console.log('Transaction Details : ', transactionDetails);
//         } catch (error) {
//             console.log('Error is : ', error);
//         }
//     // }
//     // else{
//     //     console.log('Unable to retrieve transaction');
//     // }
// }

// export default class BitcoinChain extends BitcoinAccount {
//   constructor(mnemonic: string, network: NetworkType) {
//     super(mnemonic, network);
//   }

//   // Retrieve balance of the user
//   async getBalance(): Promise<number> {
//     const balanceObject = await this._client.getBalance(this._client.getAddress());
//     const balance =
//       balanceObject[0].amount.amount().toNumber() /
//       Math.pow(10, balanceObject[0].amount.decimal);
//     return balance;
//   }

//   // Calculate 'gasFee' based on decimal
//   // calculateFee(gasFeeRate: number, decimal: number) {
//   //   const fee = gasFeeRate / Math.pow(10, decimal);
//   //   return fee;
//   // }

//   // Calculate gasFee required for transaction
//   // async getGasFee(client: Client) {
//   //   // Gas fee generated based on type of transaction. We are using BTC->BTC.
//   //   const feeWithRates = await client.getFeesWithRates("SWAP:BTC.BTC");
//   //   console.log('Fees : ', feeWithRates.fees);
//   //   console.log('Rates : ', feeWithRates.rates);

//   //   // Note: 'getFeeWithRates' is combination of both 'getFees' and 'getFeeRates'

//   //   // const fees = await client.getFees('SWAP:BTC.BTC');
//   //   // console.log('Fees : ', fees);
//   //   // const feeRates = await client.getFeeRates();
//   //   // console.log('Rates : ', feeRates);
//   //   return {
//   //     slow: {
//   //       fee: this.calculateFee(
//   //         feeWithRates.fees.average.amount().toNumber(),
//   //         feeWithRates.fees.average.decimal
//   //       ),
//   //     },
//   //     average: {
//   //       fee: this.calculateFee(
//   //         feeWithRates.fees.fast.amount().toNumber(),
//   //         feeWithRates.fees.fast.decimal
//   //       ),
//   //     },
//   //     fast: {
//   //       fee: this.calculateFee(
//   //         feeWithRates.fees.fastest.amount().toNumber(),
//   //         feeWithRates.fees.fastest.decimal
//   //       ),
//   //     },
//   //   };
//   // }

//   // Get gasFeeRate for transaction
//   // getFeeRates() returns gas fee generated by
//   // 'thorchain' (https://github.com/xchainjs/xchainjs-lib/blob/bf13c939d87a624788cc4a60daf5a940c950c1e0/packages/xchain-client/src/BaseXChainClient.ts#L81)
//   // else 'sochain'(https://github.com/xchainjs/xchainjs-lib/blob/bf13c939d87a624788cc4a60daf5a940c950c1e0/packages/xchain-bitcoin/src/sochain-api.ts)
//   // Note: For 'fast' transaction we are making use of gasFee same as 'average'
//   async getGasFee() {
//     const feeRates = await this._client.getFeeRates();
//     // console.log('Rates : ', feeRates);
//     return {
//       slow: {
//         fee: feeRates.average
//       },
//       average: {
//         fee: feeRates.fast
//       },
//       fast: {
//         fee: feeRates.fast
//       },
//     };
//   }

//   // Transfer tokens to the receiver
//   async createTransactionAndSend(
//     toAddress: string,
//     amount: number,
//     feeRate?: number
//   ): Promise<string> {
//     // Convert amount to BigNumber
//     const toAmount = new BigNumber(amount * Math.pow(10, 8));
//     // console.log('To amount : ', toAmount.toNumber().toFixed(2));

//     // BaseAmount value
//     const bsAmount = baseAmount(toAmount, 8);
//     // console.log('Base amount : ', bsAmount.amount());

//     // Transfer amount to recipient
//     const transactionHash = await this._client.transfer({
//       walletIndex: 0,
//       asset: AssetBTC,
//       recipient: toAddress,
//       amount: bsAmount,
//       memo: "SWAP:BTC.BTC",
//       feeRate: feeRate ? feeRate * Math.pow(10, 8) : 1, // '1' is for testing
//     });
//     // console.log('Transaction id : ', transactionHash);
//     return transactionHash;

//     // Get transaction details using transaction hash.
//     // Display details only for confirmed transactions else status error
//     // try {
//     //     const transactionDetails = await client.getTransactionData(transactionHash);
//     //     console.log('Transaction Details : ', transactionDetails);
//     //     return {
//     //         transactionDetails,
//     //         transactionHash
//     //     }
//     // } catch (error) {
//     //     console.log('Error is : ', error);
//     // }
//   }
// }
