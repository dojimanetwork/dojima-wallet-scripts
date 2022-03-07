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

import Arweave from 'arweave';
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
import * as bip39 from 'bip39';
import ArweaveInitialise from '../types/interfaces/arweave_initialise';
import { NetworkType } from '../types/interfaces/network';

export default class ArweaveAccount {
    _mnemonic: string;
    _network: NetworkType;
    _arweave: Arweave;
    constructor(mnemonic: string, network: NetworkType) {
        this._mnemonic = mnemonic;
        this._network = network;
        this._arweave = new ArweaveInitialise(this._mnemonic, this._network).init();
    }

    async create(): Promise<string> {
        const keyPair = await getKeyFromMnemonic(this._mnemonic);
        const address = await this._arweave.wallets.jwkToAddress(keyPair);
        return address;
    }
}