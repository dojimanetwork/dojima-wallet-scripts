// import { chains } from "../src/balance";
// import * as bip39 from 'bip39';
// import { hdkey } from "ethereumjs-wallet"
// import { EthereumWeb3 } from "../src/types/interfaces/ethereum_web3";
// import * as ethers from 'ethers';
import EthereumChain from '../src/balance/ethereum';

// async function getInit() {
//     const web3Instance = await new EthereumWeb3('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn').init();
//     const ethereumResult = new chains.EthereumChain(web3Instance.web3, web3Instance.walletDetails);
//     const balance = await ethereumResult.getBalance();
//     console.log(balance);
//     // const transfer = await ethereumResult.createTransactionAndSend('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.005)
//     // console.log('Transfer status : ', transfer);
// }

// console.log(getInit());
// console.log(chains.EthereumChain());

async function Eth() {
    const seed = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn';
    const ethereumInstance = new EthereumChain(seed, 'testnet');
    const address = ethereumInstance.getAddress(seed)
    console.log(address);
    const balance = await ethereumInstance.getBalance(address);
    console.log(balance);
    const gasFee = await ethereumInstance.getGasFee();
    console.log(gasFee);
    // console.time('Tx')
    // const transfer = await ethereumInstance.createTransactionAndSend('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.5, ethWeb3);
    // console.timeEnd('Tx')
    // console.log('Transfer status : ', transfer);
    const tx1 = ethereumInstance.createTransaction('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.0005, gasFee.slow.fee.asset_fee)
    // console.time('Tx1')
    const transfer1 = await ethereumInstance.signAndSend(tx1);
    // console.timeEnd('Tx1')
    // console.log('Transfer status : ', transfer1);
    const tx2 = ethereumInstance.createTransaction('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.0005, gasFee.average.fee.asset_fee)
    // console.time('Tx2')
    const transfer2 = await ethereumInstance.signAndSend(tx2);
    // console.timeEnd('Tx2')
    // console.log('Transfer status : ', transfer2);
    const tx3 = ethereumInstance.createTransaction('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.5, gasFee.fast.fee.asset_fee)
    // console.time('Tx3')
    const transfer3 = await ethereumInstance.signAndSend(tx3);
    // console.timeEnd('Tx3')
    // console.log('Transfer status : ', transfer3);
    // let txDetails = await ethereumInstance.getTransactionDetails('0x5c2cf22cfe3788bacac2ca248cf0880716e49beb359718b9aa623547c0cfc8b9');
    // console.log('Transaction details : ', txDetails);
}

console.log(Eth());
