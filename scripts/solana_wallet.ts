// import { chains } from "../src/balance";
// import * as web3 from '@solana/web3.js'
// import * as bip39 from 'bip39'
// import { SolanaConnection } from "../src/types/interfaces/solana_connection";
import SolanaChain from "../src/balance/solana";

// console.log(chains.solana());

// var wallet = web3.Keypair.generate();
// console.log('Wallet address : ' + wallet.publicKey.toString());
// // console.log(new chains.SolanaChain(wallet).connect());

// async function Sol() {
//     const connectionDetails = await new SolanaConnection(wallet).init();

//     const solanaData = new SolanaChain(wallet, connectionDetails.connection, connectionDetails.airdropSignature);

//     console.log(solanaData.getBalance());

//     console.log(await solanaData.createTransactionAndSend('G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n', 1000000000 / 500)); // Send SOL tokens for example
    
// }

// console.log(Sol());

async function Sol() {
    const seed = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn';
    const solanaInstance = new SolanaChain(seed, 'devnet');
    const address = await solanaInstance.getAddress(seed);
    console.log(address);
    const keypair = await solanaInstance.getKeypair(seed);
    console.log(keypair);
    let bal = await solanaInstance.getBalance(address)
    console.log('Balance is : ', bal);
    // console.log(await solanaInstance.createTransactionAndSend('G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n', 0.001, solConnection)); // Send SOL tokens for example
    const gasFee = await solanaInstance.getFees();
    // console.log('Gas Fee : ', gasFee);
    const rawTx = await solanaInstance.createTransaction('G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n', 0.001);
    // console.log('Raw Transaction : ', rawTx);
    const transactionHash = await solanaInstance.signAndSend(rawTx);
    // console.log('Transaction Hash : ', transactionHash);
}

console.log(Sol());