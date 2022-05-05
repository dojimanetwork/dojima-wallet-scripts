import SolanaTransaction from '../src/transactions/solana';

async function getSol() {
    const solInstance = new SolanaTransaction('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'devnet');
    const address = await solInstance.getAddress();
    console.log(address);
    const txHistory = await solInstance.getTransactionsHistory({address: address});
    console.log(txHistory);
    const txData = await solInstance.getTransactionData("xMteBvxZhnbBuZ8HtprjAA7PtetyDq2EU9Ebn5Y5Sdf2tTxF1etuouoGqWm8hwQryEXHDZSgehW7umTUUG7kMBy");
    console.log(txData);
}

(async() => {
  await getSol();
})()