import EthereumTransaction from "../src/transactions/ethereum";

async function getBtc() {
    const ethInstance = new EthereumTransaction('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    const txHistory = await ethInstance.getTransactionsHistory({apiKey: '6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C', action: 'txlist'});
    console.log('Txs :: ',txHistory);
    const data = await ethInstance.getTransactionData({hash: '0xc6eb140729c998532ba1bcdd61210731bcc31fcbb587147468e8a06ccc6fbb3e',apiKey: '6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C', action: 'eth_getTransactionByHash'});
    console.log('Tx data :: ', data);
}

(async() => {
  await getBtc();
})()