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
    // // const apiValue = await new PolkadotApi('wss://westend-rpc.polkadot.io').init();
    // const apiValue = await new PolkadotApi('testnet').init();
    // // console.log('Api is : ', apiValue);
    // const polka = new chains.PolkadotChain('blade night lawn zone clown cannon wheat day found head enable fury', apiValue);
    // console.log(polka.getBalance());
    // // console.log(polka.createTransactionAndSend('5CXG1XVXjbVuNG1JxbRhxupMqym8sQkG6uMZB3KmKFP2C5fo', 10000000));

    await cryptoWaitReady();
    const polka = new chains.PolkadotChain('blade night lawn zone clown cannon wheat day found head enable fury', 'testnet');
    const api = await polka.init();
    const bal = await polka.getBalance(api);
    // console.log('Balance is : ', bal);
    // console.log(polka.createTransactionAndSend('5CXG1XVXjbVuNG1JxbRhxupMqym8sQkG6uMZB3KmKFP2C5fo', 0.001, api));
    const rawTx = await polka.createTransaction('5CXG1XVXjbVuNG1JxbRhxupMqym8sQkG6uMZB3KmKFP2C5fo', 0.001, api);
    // console.log('Raw Tx is : ', rawTx);
    const gasFee = await polka.getGasFee(rawTx);
    // console.log('Gas Fee is : ', gasFee);
    const transactionHash = await polka.signAndSend(rawTx, api);
    // console.log('Transaction hash : ', transactionHash);
}

console.log(apiVal());
