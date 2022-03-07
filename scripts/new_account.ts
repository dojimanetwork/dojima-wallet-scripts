// import { accounts, acc } from "../src/accounts";

// async function newAccount() {
//     console.log("_________Ethereum Account_________");
//     console.log(accounts.getEth());
//     console.log("_________Bitcoin Account_________");
//     console.log(accounts.getBitcoin());
//     console.log("_________Solana Account_________");
//     console.log(accounts.getSolana());
//     console.log("_________Polkadot Account_________");
//     console.log(accounts.getPolkadot());
//     console.log("_________Arweave Account_________");
//     try {
//         let res = await accounts.getArweave();
//         console.log("Result -- "+res);
//         return res
//     } catch (error) {
//         console.log(error);
//     }
// }

// console.log(newAccount());

// console.log(accounts.createAccount());

// console.log(acc.create());

import { accounts } from "../src/accounts";

const mnemonic = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn';

async function arweaveAddress() {
    const arwAcc = new accounts.ArweaveAccount(mnemonic,'testnet');
    const arwAddress = await arwAcc.create()
    console.log('Arweave account address', arwAddress);
}

console.log(arweaveAddress());

async function bitcoinAddress() {
    const btcAcc = new accounts.BitcoinAccount(mnemonic,'testnet');
    const btcAddress = btcAcc.create()
    console.log('Bitcoin account address', btcAddress);
}

console.log(bitcoinAddress());

async function ethereumAddress() {
    const ethAcc = new accounts.EthereumAccount(mnemonic);
    const ethAddress = ethAcc.create()
    console.log('Ethereum account address', ethAddress);
}

console.log(ethereumAddress());

async function polkadotAddress() {
    const polAcc = new accounts.PolkadotAccount(mnemonic, 'testnet');
    const polAddress = await polAcc.create('sr25519');
    console.log('Polkadot account address', polAddress);
}

console.log(polkadotAddress());

async function solanaAddress() {
    const solAcc = new accounts.SolanaAccount(mnemonic);
    const solAddress = await solAcc.create()
    console.log('Solana account address', solAddress);
}

console.log(solanaAddress());