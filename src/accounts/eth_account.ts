// import Web3 from 'web3'
// import { Account } from 'web3-core'

// export default function getEth(): Account {
//     var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
//     var ethAccount = web3.eth.accounts.create();
//     return ethAccount;
// }

import * as ethers from 'ethers';
import EthereumWeb3 from '../types/interfaces/ethereum_web3';
import { NetworkType } from '../types/interfaces/network';

export default class EthereumAccount extends EthereumWeb3 {
    constructor(mnemonic: string, network: NetworkType) {
        super(mnemonic, network)
    }

    getAddress(): string {
        const account = ethers.Wallet.fromMnemonic(this._mnemonic);
        const address = account.address;
        return address;
    }
}