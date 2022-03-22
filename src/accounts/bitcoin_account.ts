// import BIP32Factory from 'bip32'
// import * as bip39 from 'bip39'
// import {payments, networks} from 'bitcoinjs-lib'
// import * as ecc from 'tiny-secp256k1';

// const bip32 = BIP32Factory(ecc);

// export default function getBitcoin() {
//     //Define the network
//     const network = networks.testnet //use networks.bitcoin for mainnet

//     // Derivation path
//     const path = `m/49'/1'/0'/0` // Use m/49'/0'/0'/0 for mainnet

//     var mnemonic = bip39.generateMnemonic()
//     const seed = bip39.mnemonicToSeedSync(mnemonic)
//     var root = bip32.fromSeed(seed, network)

//     var account = root.derivePath(path)
//     var node = account.derive(0).derive(0)
    
//     var btcAddress = payments.p2pkh({
//         pubkey: node.publicKey,
//         network: network,
//     }).address

//     const btcAccount = 'Wallet generated is : '+ 
//             '  - Address  : '+btcAddress + 
//             '  - Key  :' + node.toWIF() + 
//             '  -Mnemonic  :' + mnemonic
//     // console.log(`
//     //     Wallet generated:
//     //     - Address  : ${btcAddress},
//     //     - Key : ${node.toWIF()}, 
//     //     - Mnemonic : ${mnemonic}
//     // `)
//     return btcAccount
// }

// import { Client } from "@xchainjs/xchain-bitcoin";
import BitcoinClient from "../types/interfaces/bitcoin_client";
import { NetworkType } from "../types/interfaces/network";

export default class BitcoinAccount extends BitcoinClient {
    constructor(mnemonic: string, network: NetworkType) {
        super(mnemonic, network)
    }

    getAddress(): string {
        const address = this._client.getAddress();
        return address;
    }
}