// import Arweave from 'arweave'
// import { JWKInterface } from 'arweave/node/lib/wallet';
// import { getKeyFromMnemonic } from "arweave-mnemonic-keys"
// import * as bip39 from 'bip39'

// const arweave = Arweave.init({});

// export default async function getArweave() {
//     // const key = arweave.wallets.generate()

//     // return key
//     // arweave.wallets.generate().then((key) => {
//     //     console.log(key);
//     //     arweave.wallets.jwkToAddress(key).then((address) => {
//     //         console.log(address);
//     //     });
//     // })

//     const mnemonic = bip39.generateMnemonic()

//     const keyPair = await getKeyFromMnemonic(mnemonic)

//     for(var key in keyPair) {
//         console.log(`${key} : ${keyPair[key]}`);
//     }

//     const address = await arweave.wallets.jwkToAddress(keyPair)

//     return address
// }

// import Arweave from "arweave";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
// import * as bip39 from "bip39";
import ArweaveInitialise from "../types/interfaces/arweave_initialise";
import { NetworkType } from "../types/interfaces/network";

export default class ArweaveAccount extends ArweaveInitialise {
  constructor(network: NetworkType) {
    super(network);
  }

  async getAddress(mnemonic: string): Promise<string> {
    const keyPair = await getKeyFromMnemonic(mnemonic);
    const address = await this._arweave.wallets.jwkToAddress(keyPair);
    return address;
  }

  async mintArTokens(pubAddress: string) {
    // const pvtKey = await getKeyFromMnemonic(this._mnemonic);
    // console.log('Pvt key is : ' + pvtKey);
    // const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);
    // console.log('Pub Address is : ' + pubAddress);

    // testnet tokens in winston
    const test_ar_amount = 5000000000000;

    // Mint balance in Arlocal for testing
    await this._arweave.api.get(`/mint/${pubAddress}/${test_ar_amount}`);
    await this._arweave.api.get("/mine");
  }
}
