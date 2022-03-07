// import Web3 from 'web3'
// import { Account } from 'web3-core'

// export default function getEth(): Account {
//     var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
//     var ethAccount = web3.eth.accounts.create();
//     return ethAccount;
// }

import * as ethers from 'ethers';

export default class EthereumAccount {
    _mnemonic: string;
    constructor(mnemonic: string) {
        this._mnemonic = mnemonic;
    }

    create(): string {
        const account = ethers.Wallet.fromMnemonic(this._mnemonic);
        const address = account.address;
        return address;
    }
}