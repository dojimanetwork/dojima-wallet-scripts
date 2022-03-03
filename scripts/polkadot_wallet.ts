import { chains } from "../src/balance"
import { PolkadotApi } from "../src/types/interfaces/polkadot_api";
import { cryptoWaitReady } from '@polkadot/util-crypto';

// console.log(
//     chains.Polkadot(
//         'blade night lawn zone clown cannon wheat day found head enable fury',
//         'route essence bench height animal sea nominee black polar donate shaft quantum'
//     )
// );

async function apiVal() {
    // const apiValue = await new PolkadotApi('wss://westend-rpc.polkadot.io').init();
    const apiValue = await new PolkadotApi('testnet').init();
    // console.log('Api is : ', apiValue);
    const polka = new chains.PolkadotChain('blade night lawn zone clown cannon wheat day found head enable fury', apiValue);
    console.log(polka.getBalance());
    // console.log(polka.createTransactionAndSend('5CXG1XVXjbVuNG1JxbRhxupMqym8sQkG6uMZB3KmKFP2C5fo', 10000000));
}

console.log(apiVal());
