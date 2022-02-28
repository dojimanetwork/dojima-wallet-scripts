/* import * as bip39 from 'bip39'
import Web3 from 'web3'
import { Account } from 'web3-core'
import BIP32Factory from 'bip32'
import {payments, networks} from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1';
import { Keypair } from '@solana/web3.js'
import { Keyring } from '@polkadot/api';
import {mnemonicGenerate, mnemonicValidate, mnemonicToMiniSecret, naclBoxPairFromSecret} from '@polkadot/util-crypto';
import Arweave from 'arweave'
import { JWKInterface } from 'arweave/node/lib/wallet';
import { getKeyFromMnemonic } from "arweave-mnemonic-keys"
import { hdkey } from "ethereumjs-wallet"

const arweave = Arweave.init({});

async function getArweave(mnemonic: string) {
    // const key = arweave.wallets.generate()

    // return key
    // arweave.wallets.generate().then((key) => {
    //     console.log(key);
    //     arweave.wallets.jwkToAddress(key).then((address) => {
    //         console.log(address);
    //     });
    // })

    const keyPair = await getKeyFromMnemonic(mnemonic)

    for(var key in keyPair) {
        console.log(`${key} : ${keyPair[key]}`);
    }

    const address = await arweave.wallets.jwkToAddress(keyPair)

    return address
}

function getPolkadot(mnemonic: string) {
    const keyring = new Keyring() // default type "ed25519"
    // For specific type of keyring
    // const keyring = new Keyring({ type: "sr25519" });

    // Create mnemonic string
    // const mnemonic = mnemonicGenerate();
    // console.log(`Generated mnemonic: ${mnemonic}`);

    const isValidMnemonic = mnemonicValidate(mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic')
    }

    // Add an account derived from the mnemonic
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;
    const jsonWallet = JSON.stringify(keyring.toJson(address), null, 2)

    return jsonWallet

    // const mnemonic = "fiscal unable lift civil absent hazard next love cactus tired item north"

    // const isValidMnemonic = mnemonicValidate(mnemonic);

    // console.log(`isValidMnemonic: ${isValidMnemonic}`);

    // // Create valid Substrate-compatible seed from mnemonic
    // const seedAlice = mnemonicToMiniSecret(mnemonic);
    // console.log("Seed Alice : "+seedAlice);
    

    // // Generate new public/secret keypair for Alice from the supplied seed
    // const { publicKey, secretKey } = naclBoxPairFromSecret(seedAlice);
    // console.log("Public Key : " + publicKey + " and Private Key : " + secretKey);
    
}

function getSolana(mnemonic: string) {
    // For 64-byte Uint8Array
    // const seed = bip39.mnemonicToSeedSync(mnemonic)

    // For 32-byte Uint8Array
    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0,32)

    const solanaAccount = Keypair.fromSeed(seed)

    // To get keypair from already having secretkey
    
    // let secretkey = Uint8Array.from(solanaAccount.secretKey)
    // let keypair = Keypair.fromSecretKey(secretkey)

    const publicKey = solanaAccount.publicKey.toString()
    // const privateKey = solanaAccount.secretKey.toString()
    const privateKey = Buffer.from(solanaAccount.secretKey).toString('base64')
    console.log([publicKey, privateKey]);

    return solanaAccount
}

const bip32 = BIP32Factory(ecc);

function getBitcoin(mnemonic: string) {
    //Define the network
    const network = networks.testnet //use networks.bitcoin for mainnet

    // Derivation path
    const path = `m/49'/1'/0'/0` // Use m/49'/0'/0'/0 for mainnet

    const seed = bip39.mnemonicToSeedSync(mnemonic)
    var root = bip32.fromSeed(seed, network)

    var account = root.derivePath(path)
    var node = account.derive(0).derive(0)
    
    var btcAddress = payments.p2pkh({
        pubkey: node.publicKey,
        network: network,
    }).address

    const btcAccount = 'Wallet generated is : '+'  - Address  : '+btcAddress+'  - Key  :' + node.toWIF()+'  -Mnemonic  :' + mnemonic
    return btcAccount
}

function getEth(): Account {
    var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
    var ethAccount = web3.eth.accounts.create();
    return ethAccount;
}

async function getEthereum(mnemonic: string) {
    var path = "m/44'/60'/0'/0/0";
    
    var key = await bip39.mnemonicToSeed(mnemonic)
    var hdwallet = hdkey.fromMasterSeed(key);
    var wallet = hdwallet.derivePath(path).getWallet();
    var address = "0x" + wallet.getAddress().toString("hex");
    return ("Ethereum : " + address);
}

export default async function createAccount() {
    
    // const mnemonic = bip39.generateMnemonic()
    const mnemonic = "humble what wrong shrug order answer dog shove program obtain afraid pilot"
    console.log("Mnemonic generated : " + mnemonic);
    console.log("_________Ethereum Account_________");
    console.log(getEth());
    console.log("_________Bitcoin Account_________");
    console.log(getBitcoin(mnemonic));
    console.log("_________Solana Account_________");
    console.log(getSolana(mnemonic));
    console.log("_________Polkadot Account_________");
    console.log(getPolkadot(mnemonic));
    console.log("_________Arweave Account_________");
    try {
        let res = await getArweave(mnemonic);
        console.log("Result is -- "+res);
        return res
    } catch (error) {
        console.log(error);
    }
    console.log("_________Ethereum Mnemonic Account_________");
    try {
        let res = await getEthereum(mnemonic);
        console.log("Result -- "+res);
        return res
    } catch (error) {
        console.log(error);
    }
} */

import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import Arweave from "arweave";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
// import { Keyring } from "@polkadot/api";
// import { mnemonicValidate } from "@polkadot/util-crypto";
// import BIP32Factory from "bip32";
// import { payments, networks } from "bitcoinjs-lib";
// import * as ecc from "tiny-secp256k1";
import { hdkey } from "ethereumjs-wallet";
import { NetworkType } from "../types/interfaces/network";

export default class CreateAccount {
  _mnemonic: string;
  network: string;
  //arweave configuration to talk to blockchain
  arweave = Arweave.init({
    host: "htts://arweave.net/",
    protocol: "https",
    timeout: 100000,
  });
  // bip32 = BIP32Factory(ecc);

  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this.network = network;
  }

  async getArweave(): Promise<string> {
    const keyPair = await getKeyFromMnemonic(this._mnemonic);
    // for (const key in keyPair) {
    //   console.log(`${key} : ${keyPair[key]}`);
    // }
    const address = await this.arweave.wallets.jwkToAddress(keyPair);
    return address;
  }

  // getBitcoin(_network: networks.Network) {
  //   //Define the network
  //   const network = _network;

  //   // Derivation path
  //   const path = `m/49'/1'/0'/0`; // Use m/49'/0'/0'/0 for mainnet
  //   const seed = bip39.mnemonicToSeedSync(this._mnemonic);
  //   var root = this.bip32.fromSeed(seed, network);
  //   var account = root.derivePath(path);
  //   var node = account.derive(0).derive(0);
  //   var btcAddress = payments.p2pkh({
  //     pubkey: node.publicKey,
  //     network: network,
  //   }).address;
  //   // const btcAccount =
  //   //   'Wallet generated is : ' +
  //   //   '  - Address  : ' +
  //   //   btcAddress +
  //   //   '  - Key  : ' +
  //   //   node.toWIF() +
  //   //   '  - Mnemonic  : ' +
  //   //   this._mnemonic;
  //   return btcAddress;
  // }

  async getEthereum() {
    // Create new account
    // var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
    // var ethAccount = web3.eth.accounts.create();

    var path = "m/44'/60'/0'/0/0";
    var key = await bip39.mnemonicToSeed(this._mnemonic);
    var hdwallet = hdkey.fromMasterSeed(key);
    var wallet = hdwallet.derivePath(path).getWallet();
    var address = "0x" + wallet.getAddress().toString("hex");
    return address;
  }

  // getPolkadot() {
  //   const keyring = new Keyring(); // default type "ed25519"
  //   // For specific type of keyring
  //   // const keyring = new Keyring({ type: "sr25519" });

  //   // Create mnemonic string
  //   // const mnemonic = mnemonicGenerate();

  //   const isValidMnemonic = mnemonicValidate(this._mnemonic);
  //   if (!isValidMnemonic) {
  //     throw Error("Invalid Mnemonic");
  //   }

  //   // Add an account derived from the mnemonic
  //   const account = keyring.addFromUri(this._mnemonic);
  //   const address = account.address;
  //   // const jsonWallet = JSON.stringify(keyring.toJson(address), null, 2);
  //   return address;
  // }

  getSolana() {
    const seed = bip39.mnemonicToSeedSync(this._mnemonic).slice(0, 32);
    const solanaAccount = Keypair.fromSeed(seed);
    const publicKey = solanaAccount.publicKey.toString();
    const privateKey = Buffer.from(solanaAccount.secretKey).toString("base64");
    console.log([publicKey, privateKey]);
    return publicKey;
  }

  async create() {
    // const network = this.network ?? "mainnet";

    // const bitcoinNetwork =
    //   network === "mainnet" ? networks.bitcoin : networks.testnet;

    const arweaveAddress = await this.getArweave();
    // const bitcoinAddress = this.getBitcoin(bitcoinNetwork);
    const ethereumAddress = await this.getEthereum();
    // const polkadotAddress = this.getPolkadot();
    const solanaAddress = this.getSolana();

    // return [aacc, bacc, eacc, pacc, [sacc.publicKey, sacc.secretKey]];

    return {
      arweaveAddress,
      // bitcoinAddress,
      ethereumAddress,
      // polkadotAddress,
      solanaAddress,
    };
  }
}
