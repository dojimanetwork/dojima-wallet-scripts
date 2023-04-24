// import * as fs from "fs";
// import * as path from "path";
// import { parse } from 'csv-parse';
// import { createObjectCsvWriter } from 'csv-writer';
// import axios from "axios";
// import * as ethers from "ethers";
// import {createObjectCsvWriter} from "csv-writer";
// import path from "path";

// type AccountsList = {
//     id: string,
//     private_key: string,
//     time: string
// }

// import nacl from "tweetnacl";
// import * as bip39 from 'bip39';
// import * as bip32 from 'bip32';
// import { derivePath } from "ed25519-hd-key";
// const { toUint8Array } = require('@arcblock/forge-util');
// import { toUint8Array } from '@arcblock/forge-util'

(async () => {
    // const seed = await bip39.mnemonicToSeed('satoshi language cousin observe usual street spell luxury develop voice coral any');
    // // const derivedSeed = derivePath("44'/931'/0'/0/", seed.toString('hex')).key;
    // // const derivedSeed = this.deriveSeed(seed, walletIndex, dPath, accountIndex);
    // const derivedSeed = toUint8Array(seed)
    // const key = nacl.sign.keyPair.fromSeed(derivedSeed)
    // console.log(key)
    // const responseApi = await axios.get(
    //     `https://fiber-test.h4s.dojima.network/api/v1/all_accounts`
    // );
    // if(responseApi.status === 200) {
    //     const data: Array<AccountsList> = responseApi.data.data
    //     let dojimaAddress: Array<any> = []
    //     for(let i=0; i<data.length; i++) {
    //         const walletInst = new ethers.Wallet(data[i].private_key)
    //         const address = await walletInst.getAddress()
    //         dojimaAddress.push({
    //             address: `${address}`,
    //             private_key: `${data[i].private_key}`
    //         })
    //     }
    //     const writer = createObjectCsvWriter({
    //         path: path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/dojima_add.csv'),
    //         header: [
    //             { id: 'address', title: 'Dojima Address' },
    //             { id: 'private_key', title: 'Private Key' },
    //         ],
    //     });
    //
    //     writer.writeRecords(dojimaAddress).then(() => {
    //         console.log('Done correct addr : ', dojimaAddress.length)
    //     })
    // }
    // const acc = ethers.Wallet.createRandom()
    // console.log(acc.mnemonic.phrase)
    // const _source = ethers.Wallet.fromMnemonic('satoshi language cousin observe usual street spell luxury develop voice coral any');
    // console.log(_source.address)
})();