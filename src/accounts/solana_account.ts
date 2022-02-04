import { Keypair } from '@solana/web3.js'
import * as bip39 from 'bip39'

export default function getSolana() {
    const mnemonic = bip39.generateMnemonic()

    // For 64-byte Uint8Array
    // const seed = bip39.mnemonicToSeedSync(mnemonic)

    // For 32-byte Uint8Array
    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0,32)

    const solanaAccount = Keypair.fromSeed(seed)

    // To get keypair from already having secretkey
    
    // let secretkey = Uint8Array.from(solanaAccount.secretKey)
    // let keypair = Keypair.fromSecretKey(secretkey)

    return solanaAccount
}