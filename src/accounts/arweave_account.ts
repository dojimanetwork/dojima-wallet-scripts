import Arweave from 'arweave'
import { JWKInterface } from 'arweave/node/lib/wallet';
import { getKeyFromMnemonic } from "arweave-mnemonic-keys"
import * as bip39 from 'bip39'

const arweave = Arweave.init({});

export default async function getArweave() {
    // const key = arweave.wallets.generate()

    // return key
    // arweave.wallets.generate().then((key) => {
    //     console.log(key);
    //     arweave.wallets.jwkToAddress(key).then((address) => {
    //         console.log(address);
    //     });
    // })

    const mnemonic = bip39.generateMnemonic()

    const keyPair = await getKeyFromMnemonic(mnemonic)

    for(var key in keyPair) {
        console.log(`${key} : ${keyPair[key]}`);
    }

    const address = await arweave.wallets.jwkToAddress(keyPair)

    return address
}