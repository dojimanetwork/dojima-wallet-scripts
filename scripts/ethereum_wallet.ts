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
    console.log(balance);
    const transfer = await ethereumInstance.createTransactionAndSend('0x46Bd84009D313c34f94bC883C353f72D3453A5B9', 0.005, ethWeb3)
    console.log('Transfer status : ', transfer);
}

console.log(Eth());
