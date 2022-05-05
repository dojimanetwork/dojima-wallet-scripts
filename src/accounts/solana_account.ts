import * as web3 from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { NetworkType } from "../types/interfaces/network";
import SolanaConnection from "../types/interfaces/solana_connection";

export default class SolanaAccount extends SolanaConnection {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getKeypair(): Promise<Keypair[]> {
    const seed = bip39.mnemonicToSeedSync(this._mnemonic, ""); // (mnemonic, password)
    const keyPairResult: web3.Keypair[] = [];
    for (let i = 0; i < 10; i++) {
      const path = `m/44'/501'/${i}'/0'`;
      const keypair = web3.Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key
      );
      keyPairResult.push(keypair);
    }
    return keyPairResult;
  }

  async getAddress() {
    const keypair = await this.getKeypair();
    const address = keypair[0].publicKey.toBase58();
    return address;
  }
}

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

// import nacl from "tweetnacl";
// import * as bip39 from 'bip39';
// import * as bip32 from 'bip32';
// import { Account, Keypair } from "@solana/web3.js";
// import { derivePath } from "ed25519-hd-key";
// import SolanaConnection from "../types/interfaces/solana_connection";
// import { NetworkType } from "../types/interfaces/network";

// const DERIVATION_PATH = {
//     deprecated: '',
//     bip44: "bip44",
//     bip44Change: "bip44Change",
//     bip44Root: "bip44Root", // Ledger only.
// };

// const DerivationPathMenuItem = {
//     Deprecated: 0,
//     Bip44: 1,
//     Bip44Change: 2,
//     Bip44Root: 3, // Ledger only.
// };

// export default class SolanaAccount extends SolanaConnection {
//     constructor(mnemonic: string, network: NetworkType) {
//         super(mnemonic, network)
//     }

//     toDerivationPath(dPathMenuItem: number) {
//         switch (dPathMenuItem) {
//           case DerivationPathMenuItem.Deprecated:
//             return DERIVATION_PATH.deprecated;
//           case DerivationPathMenuItem.Bip44:
//             return DERIVATION_PATH.bip44;
//           case DerivationPathMenuItem.Bip44Change:
//             return DERIVATION_PATH.bip44Change;
//           case DerivationPathMenuItem.Bip44Root:
//             return DERIVATION_PATH.bip44Root;
//           default:
//             throw new Error(`invalid derivation path: ${dPathMenuItem}`);
//         }
//     }

//     deriveSeed(seed: Buffer, walletIndex: number, derivationPath: (string), accountIndex: number) {
//         switch (derivationPath) {
//           case DERIVATION_PATH.deprecated:
//             const path = `m/501'/${walletIndex}'/0/${accountIndex}`;
//             return bip32.fromSeed(seed).derivePath(path).privateKey;
//           case DERIVATION_PATH.bip44:
//             const path44 = `m/44'/501'/${walletIndex}'`;
//             return derivePath(path44, seed.toString('hex')).key;
//           case DERIVATION_PATH.bip44Change:
//             const path44Change = `m/44'/501'/${walletIndex}'/0'`;
//             return derivePath(path44Change, seed.toString('hex')).key;
//           default:
//             throw new Error(`invalid derivation path: ${derivationPath}`);
//         }
//     }

//     getAccountFromSeed(
//         seed: Buffer,
//         walletIndex: number,
//         dPath: string,
//         accountIndex = 0
//       ) {
//         const derivedSeed = this.deriveSeed(seed, walletIndex, dPath, accountIndex);
//         return new Account(nacl.sign.keyPair.fromSeed(derivedSeed as Buffer).secretKey);
//     }

//     async solAcc() {
//         const seed = await bip39.mnemonicToSeed(this._mnemonic);
//         const accounts = [...Array(10)].map((_, idx) => {
//             return this.getAccountFromSeed(
//             seed,
//             idx,
//             this.toDerivationPath(DerivationPathMenuItem.Bip44Change)
//             );
//         });
//         // for(let i = 0; i< accounts.length; i++) {
//         //   console.log('Accounts : ', accounts[i].publicKey.toString());
//         // }
//         return accounts;
//     }

//     async getKeypair(): Promise<Keypair> {
//       const account = await this.solAcc();
//       const key = account[0];
//       const keypair = Keypair.fromSecretKey(key.secretKey);
//       return keypair;
//     }

//     async getAddress(): Promise<string> {
//       const account = await this.solAcc();
//       const address = account[0].publicKey.toString();
//       return address;
//     }
// }
