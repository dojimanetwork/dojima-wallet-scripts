// import {Client,} from '@xchainjs/xchain-binance';
// import { Network } from '@xchainjs/xchain-client/lib/types';
// import { assetAmount, AssetBNB, assetToBase, baseToAsset} from '@xchainjs/xchain-util';
// import { decryptFromKeystore} from "@xchainjs/xchain-crypto";
// import Web3 from "web3";

//  export default async function connectWallet(){
//     let phrases="female hidden they what snack exist become vast method law moon decrease";
//     // // let phrase = await decryptFromKeystore()
//     // let phrase = await decryptFromKeystore(keystore1, password)


//     const bncClient = new Client({network: Network.Testnet,phrase: phrases})  
//     console.log("hello")
//     let addresses = bncClient.getAddress()
//     console.log(`test addresses : ${addresses}`)
//     // let address= "0x9479FDe177E72f872f9e195a4da9D2fC5A1E0016"
//     // console.log(`Asset Address is: ${address}`)

//     let balances = await bncClient.getBalance(addresses)
//     // console.log(`balance -${balances}`);
//     // let addbalances = await bncClient.getBalance(address)
//     let amount = balances[0].amount; 
//     try {
//         let assetAmount = (baseToAsset(amount)).amount()
//         console.log(`with balance: ${assetAmount}`)
//     } catch (error) {
//         console.log('no balance',error)
//     }
//     let hash = ""

//         let amountToTransfer = 0.002
//         let recipient = "tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va"
//         let tamount = assetToBase(assetAmount(amountToTransfer, 8))
//         console.log("Building transaction")
//         try {
//             const txid = await bncClient.transfer({
//                 "walletIndex":0,
//                 "asset": AssetBNB,
//                 "amount": tamount,
//                 "recipient": recipient,
//                 "memo": "memo"
//             })
//             hash =txid
//             console.log(`Amount ${tamount.amount().toString()} ${AssetBNB.symbol} TransactionId: ${txid}`)
//         } catch (error) {
//             console.log(`Transfer failed: ${error}`)
//         }
//         console.log(hash);
//         try {
//             const txData = await bncClient.getTransactionData(hash)
//             console.log(`From ${JSON.stringify(txData.from[0]["from"])}`)
//             console.log(`Toop ${JSON.stringify(txData.to[0]["to"])}`)
    
//         } catch (error) {
//             // const txData = await bncClient.getTransactionData(hash)
//             // console.log(JSON.stringify(txData.from[0]["from"]))

//             console.log(`Error: ${error}`)
//         }

//         let tx = await bncClient.getTransactions()
    
//     // Retrieve transaction history for a set address
//     // txHistoryParams > address, offset, startTime, asset? 
//         try {
//                 const txHistory = await bncClient.getTransactions({address: addresses, limit:4 })
//                 console.log(`Found ${txHistory.total.toString()}`)
//                 txHistory.txs.forEach(tx => console.log(JSON.stringify(tx.to)))
                
//             } catch (error) {
//                 console.log('Error:' ,error)
//         }

        
//     const Web3 = require('web3');

//     const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
//     // console.log(web3_bsc);
//     var account = await web3.eth.getBalance("0x9479FDe177E72f872f9e195a4da9D2fC5A1E0016");
//     var details = await web3.eth.getAccounts()
//     let n = parseFloat(account);
//     console.log("balance : ",n/10**18)
// }

// (async () => {
//     await connectWallet();
//  })();

import {BncClient} from "@binance-chain/javascript-sdk";
import { NetworkType } from './network';
import * as crypto from '@binance-chain/javascript-sdk/lib/crypto'

type PrivKey = string;

export class BinanceConnection {
    _client : BncClient;
    // _network: string;

    //  client.initChain()
    constructor(){
        this._client =new BncClient("https://testnet-dex.binance.org/");
        // this._network = network;
    }
    // address = _client.recoverAccountFromMnemonic(mnemonic)
    // private getPrivateKey(index: number): PrivKey {
    //     if (!this.phrase) throw new Error('Phrase not set')
    
    //     return crypto.getPrivateKeyFromMnemonic(this.phrase, true, index)
    //   }

}

