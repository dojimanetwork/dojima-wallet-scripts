// import { Keypair } from '@solana/web3.js'
// import * as bip39 from 'bip39'

// export default function getSolana() {
//     const mnemonic = bip39.generateMnemonic()

//     // For 64-byte Uint8Array
//     // const seed = bip39.mnemonicToSeedSync(mnemonic)

//     // For 32-byte Uint8Array
//     const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0,32)

//     const solanaAccount = Keypair.fromSeed(seed)

//     // To get keypair from already having secretkey
    
//     // let secretkey = Uint8Array.from(solanaAccount.secretKey)
//     // let keypair = Keypair.fromSecretKey(secretkey)

//     return solanaAccount
// }

import nacl from "tweetnacl";
import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import { Account } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

const DERIVATION_PATH = {
    deprecated: '',
    bip44: "bip44",
    bip44Change: "bip44Change",
    bip44Root: "bip44Root", // Ledger only.
};
  
const DerivationPathMenuItem = {
    Deprecated: 0,
    Bip44: 1,
    Bip44Change: 2,
    Bip44Root: 3, // Ledger only.
};

export class SolanaAccount {
    _mnemonic: string;
    constructor(mnemonic: string) {
        this._mnemonic = mnemonic;
    }

    toDerivationPath(dPathMenuItem: number) {
        switch (dPathMenuItem) {
          case DerivationPathMenuItem.Deprecated:
            return DERIVATION_PATH.deprecated;
          case DerivationPathMenuItem.Bip44:
            return DERIVATION_PATH.bip44;
          case DerivationPathMenuItem.Bip44Change:
            return DERIVATION_PATH.bip44Change;
          case DerivationPathMenuItem.Bip44Root:
            return DERIVATION_PATH.bip44Root;
          default:
            throw new Error(`invalid derivation path: ${dPathMenuItem}`);
        }
    }

    deriveSeed(seed: Buffer, walletIndex: number, derivationPath: (string), accountIndex: number) {
        console.log('Derive Seed : ', seed.toString('hex'));
        switch (derivationPath) {
          case DERIVATION_PATH.deprecated:
            const path = `m/501'/${walletIndex}'/0/${accountIndex}`;
            return bip32.fromSeed(seed).derivePath(path).privateKey;
          case DERIVATION_PATH.bip44:
            const path44 = `m/44'/501'/${walletIndex}'`;
            return derivePath(path44, seed.toString('hex')).key;
          case DERIVATION_PATH.bip44Change:
            const path44Change = `m/44'/501'/${walletIndex}'/0'`;
            return derivePath(path44Change, seed.toString('hex')).key;
          default:
            throw new Error(`invalid derivation path: ${derivationPath}`);
        }
    }

    getAccountFromSeed(
        seed: Buffer,
        walletIndex: number,
        dPath: string,
        accountIndex = 0
      ) {
        console.log('Get Account from Seed : ', seed);
        console.log('Wallet Index : ', walletIndex);
        console.log('Derivation Path : ', dPath);
        const derivedSeed = this.deriveSeed(seed, walletIndex, dPath, accountIndex);
        console.log('Derived Seed : ', derivedSeed);
        return new Account(nacl.sign.keyPair.fromSeed(derivedSeed as Buffer).secretKey);
    }

    async solAcc() {
        const seed = await bip39.mnemonicToSeed(this._mnemonic);
        console.log('Sol Acc Seed : ', seed);
        // const seedBuffer = Buffer.from(seed).toString("hex");
        const accounts = [...Array(10)].map((_, idx) => {
            return this.getAccountFromSeed(
            seed,
            idx,
            this.toDerivationPath(DerivationPathMenuItem.Bip44Change)
            );
        });
        for(let i = 0; i< accounts.length; i++) {
          console.log('Accounts : ', accounts[i].publicKey.toString());
        }
        return accounts;
    }
}