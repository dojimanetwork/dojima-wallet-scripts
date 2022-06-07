import Web3 from "web3";
// import * as bip39 from 'bip39';
// import { hdkey } from "ethereumjs-wallet";
import { NetworkType } from "./network";

export default class EthereumWeb3 {
    _network: NetworkType;
    _api: string;
    _providerRpcUrl: string;
    public _web3: Web3;
    constructor(network: NetworkType) {
        this._network = network;
        if(this._network === 'testnet') {
            // For testnet using ropsten network with infura. There are others like goerli, kovan and rinkeby netwoks
            this._providerRpcUrl = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
            this._api = "https://api-ropsten.etherscan.io/api";
        } else if(this._network === 'devnet') {
            this._providerRpcUrl = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
            this._api = "https://api.etherscan.io/api";
        } else {
            this._providerRpcUrl = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
            this._api = "https://api.etherscan.io/api";
        }
        this._web3 = new Web3(new Web3.providers.HttpProvider(this._providerRpcUrl));
    }
}

// import { Client } from "@xchainjs/xchain-ethereum";
// import { Network } from "@xchainjs/xchain-client";
// import { NetworkType } from "./network";
// import BigNumber from "bignumber.js";
// import { AssetETH, baseAmount } from "@xchainjs/xchain-util";

// export default class EthereumWeb3 {
//   _network: string;
//   _mnemonic: string;
//   _client: Client;
//   constructor(mnemonic: string, network: NetworkType) {
//     this._mnemonic = mnemonic;
//     this._network = network;
//     this._client = new Client({ phrase: this._mnemonic });
//     // Default 'network' is 'testnet' in Xchainjs Client
//     if (this._network === "mainnet") {
//       this._client.setNetwork(Network.Mainnet);
//     } else if (this._network === "devnet") {
//       this._client.setNetwork(Network.Stagenet);
//     } else {
//       this._client.setNetwork(Network.Testnet);
//     }
//     console.log("Client : ", this._client);
//   }

//   getAddress() {
//     const address = this._client.getAddress();
//     return address;
//   }

//   async getBalance() {
//     const balanceObject = await this._client.getBalance(
//       this._client.getAddress()
//     );
//     const balance =
//       balanceObject[0].amount.amount().toNumber() /
//       Math.pow(10, balanceObject[0].amount.decimal);
//     return balance;
//   }

//   async createTransactionAndSend(
//     toAddress: string,
//     amount: number,
//     feeRate?: number
//   ) {
//     // Convert amount to BigNumber
//     const toAmount = new BigNumber(amount * Math.pow(10, 18));
//     // console.log('To amount : ', toAmount.toNumber().toFixed(2));

//     // BaseAmount value
//     const bsAmount = baseAmount(toAmount, 18);
//     // console.log('Base amount : ', bsAmount.amount());

//     // Transfer amount to recipient
//     const transactionHash = await this._client.transfer({
//       walletIndex: 0,
//       asset: AssetETH,
//       recipient: toAddress,
//       amount: bsAmount,
//       memo: "SWAP:ETH.ETH",
//     });
//     // console.log('Transaction id : ', transactionHash);
//     return transactionHash;
//   }
// }
