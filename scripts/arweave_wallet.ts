import chains from "../src/balance";
// import fs from 'fs';
// import { fromAddress, fromMnemonic, toAddress, toMnemonic } from '../src/types/variables/wallet';
// import ArweaveInitialise from "../src/types/interfaces/arweave_initialise";
// import { getKeyFromMnemonic } from "arweave-mnemonic-keys"
// import * as bip39 from 'bip39';

// // Default mnemonic 128 bits (12 words)
// const mnemonic = bip39.generateMnemonic();
// // For 24 words use below code
// // const mnemonic = bip39.generateMnemonic(256);
// console.log(mnemonic);

// const keyPair = await getKeyFromMnemonic(mnemonic)

// // for(var key in keyPair) {
// //     console.log(`${key} : ${keyPair[key]}`);
// // }
// console.log(JSON.stringify(keyPair));


// const address = await arweave.wallets.jwkToAddress(keyPair)
// console.log(address);
// const pvtKey = JSON.parse(fs.readFileSync("src/types/variables/from.json") as unknown as string);

// async function getInit() {

//     const arweaveInstance = new chains.ArweaveChain('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn','testnet');
//     const arweave = arweaveInstance.init();
//     await arweaveInstance.mintArTokens(arweave);
//     let balance = await arweaveInstance.getBalance(arweave);

//     const transfer = await arweaveInstance.createTransactionAndSend('UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', 0.05, arweave)
//     console.log(transfer);
//     balance = await arweaveInstance.getBalance(arweave);
// }

// console.log(getInit());

async function getInit() {
    const {ArweaveChain} = chains
    const arweaveInstance = new ArweaveChain('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn',"testnet");
    const arwAddress = await arweaveInstance.getAddress();
    console.log('Address : ', arwAddress);
    await arweaveInstance.mintArTokens();
    let balance = await arweaveInstance.getBalance();
    console.log('Balance : ', balance);
    const rawTx = await arweaveInstance.createTransaction('UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', 0.5);
    console.log('Raw Transaction : ', rawTx);
    const gasFee = arweaveInstance.getGasFee(rawTx);
    console.log('Gas Fee : ', gasFee);
    const transactionHash = await arweaveInstance.signAndSend(rawTx);
    console.log('Transaction Hash : ', transactionHash);
    balance = await arweaveInstance.getBalance();
}

console.log(getInit());