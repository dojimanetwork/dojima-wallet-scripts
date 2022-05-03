import BitcoinTransactions from "../src/transactions/bitcoin";

async function getTx() {
    const tx = new BitcoinTransactions('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    // const txHistory = await tx.getTransactionsHistory({address: 'tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp'});
    // console.log(txHistory);
    const txData = await tx.getTransactionData('tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp', '9b6c446674f790846be8e4640ab03f8782bf94cbaad617e67c5b6e7d2b7ffbd7');
    console.log(txData);
}

console.log(getTx());