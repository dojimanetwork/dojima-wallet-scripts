import { chains } from "../src/balance";
import * as bip39 from 'bip39';
import { hdkey } from "ethereumjs-wallet"
import { EthereumWeb3 } from "../src/types/interfaces/ethereum_web3";
import * as ethers from 'ethers';

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
    const ethereumInstance = new chains.EthereumChain('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    const ethWeb3 = ethereumInstance.init()
    const balance = await ethereumInstance.getBalance(ethWeb3);
    // console.log(balance);
    const gasFee = await ethereumInstance.getGasFee(ethWeb3);
    // console.log(gasFee);
    // console.time('Tx')
    // const transfer = await ethereumInstance.createTransactionAndSend('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.005, ethWeb3);
    // console.timeEnd('Tx')
    // console.log('Transfer status : ', transfer);
    const tx1 = ethereumInstance.createTransaction('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.005, ethWeb3,gasFee.slow.fee)
    // console.time('Tx1')
    const transfer1 = await ethereumInstance.signAndSend(tx1,ethWeb3);
    // console.timeEnd('Tx1')
    // console.log('Transfer status : ', transfer1);
    const tx2 = ethereumInstance.createTransaction('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.005, ethWeb3,gasFee.average.fee)
    // console.time('Tx2')
    const transfer2 = await ethereumInstance.signAndSend(tx2,ethWeb3);
    // console.timeEnd('Tx2')
    // console.log('Transfer status : ', transfer2);
    const tx3 = ethereumInstance.createTransaction('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.005, ethWeb3,gasFee.fast.fee)
    // console.time('Tx3')
    const transfer3 = await ethereumInstance.signAndSend(tx3,ethWeb3);
    // console.timeEnd('Tx3')
    // console.log('Transfer status : ', transfer3);
}

console.log(Eth());
