import BitcoinTransactions from "../src/transactions/bitcoin";

async function getTx() {
    const tx = new BitcoinTransactions('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    const txHistory = await tx.getTransactionsHistory('tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp');
    console.log(txHistory);
    const txData = await tx.getTransactionData('fce257cfcfd656558f2c5c5d883f8befe6ab7e1e57b0343ce06f5fb69ced3653');
    console.log(txData);
}

console.log(getTx());