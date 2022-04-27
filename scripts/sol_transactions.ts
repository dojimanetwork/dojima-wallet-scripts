import SolanaTransaction from '../src/transactions/solana';

async function getBtc() {
    const solInstance = new SolanaTransaction('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    const address = await solInstance.getAddress();
    console.log(address);
    // const txHistory = await solInstance.getTransactionsHistory(address);
    // console.log(txHistory);
    const txData = await solInstance.getTransactionData("JWqG8k3t19ATS6xEhGGxPuqRSgciWmKzxFrSz3NsbGZt4mLS5AS5gfSTvTHWBXYRbFspLmc8en54EFg1phstEUx");
    console.log(txData);
}

(async() => {
  await getBtc();
})()