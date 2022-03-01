import { generatePhrase, getSeed, validatePhrase } from '@xchainjs/xchain-crypto';
import * as bip39 from 'bip39';
import { Client } from '@xchainjs/xchain-bitcoin';
import { Balance } from '@xchainjs/xchain-client';
import { AssetBTC, assetAmount, baseAmount } from '@xchainjs/xchain-util';
import { BigNumber } from 'bignumber.js';

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

export class BitcoinChain {
    _mnemonic: string;
    _client: Client;
    constructor(mnemonic: string) {
        this._mnemonic = mnemonic;
        this._client = new Client({phrase: this._mnemonic});
    }

    // Retrieve balance of the user
    async getBalance(){
        const balanceObject = await this._client.getBalance(this._client.getAddress());
        const balance = balanceObject[0].amount.amount().toNumber() / Math.pow(10, balanceObject[0].amount.decimal);
        return balance;
    }

    // Transfer tokens to the receiver
    async createTransactionAndSend(toAddress: string, amount: number) {
        // Convert amount to BigNumber
        const toAmount = new BigNumber(amount * Math.pow(10, 8));
        // console.log('To amount : ', toAmount.toNumber().toFixed(2));

        // BaseAmount value
        const bsAmount = baseAmount(toAmount, 8);
        // console.log('Base amount : ', bsAmount.amount());

        // Transfer amount to recipient
        const transactionHash = await this._client.transfer({
            walletIndex: 0,
            asset: AssetBTC ,
            recipient: toAddress,
            amount: bsAmount,
            memo: 'SWAP:BTC.BTC',
            feeRate: 1
        });
        // console.log('Transaction id : ', transactionHash);
        return transactionHash;

        // Get transaction details using transaction hash.
        // Display details only for confirmed transactions else status error
        // try {
        //     const transactionDetails = await this._client.getTransactionData(transactionHash);
        //     console.log('Transaction Details : ', transactionDetails);
        //     return {
        //         transactionDetails,
        //         transactionHash
        //     }
        // } catch (error) {
        //     console.log('Error is : ', error);
        // }
    }
}