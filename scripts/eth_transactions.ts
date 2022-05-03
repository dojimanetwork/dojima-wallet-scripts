import EthereumTransaction from "../src/transactions/ethereum";

async function getEth() {
  const ethInstance = new EthereumTransaction(
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn",
    "testnet"
  );
  const txHistory = await ethInstance.getTransactionsHistory({
    apiKey: '6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C',
    address: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4'
  });
  console.log('Txs :: ',txHistory);
  setTimeout(async () => {
    const data = await ethInstance.getTransactionData({
      hash: '0xc6eb140729c998532ba1bcdd61210731bcc31fcbb587147468e8a06ccc6fbb3e',
      apiKey: 'J19V58VEVM69RDGJHNH69M42F2J4BFDVIV',
      address: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4'
    });
    console.log('Tx data :: ', data);
  }, 5000);
  setTimeout(async () => {
    const data = await ethInstance.getDetailTransactionData({
      hash: '0x44b7e7305b318810755e9450a7895ea088026a57772e80866fbbd893f5e92ab9',
      apiKey: 'J19V58VEVM69RDGJHNH69M42F2J4BFDVIV',
      address: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4'
    });
    console.log('Tx data :: ', data);
  }, 5000);
  const erc20txHistory = await ethInstance.getErc20TransactionsHistory({
    apiKey: "6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C",
    action: "tokentx",
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    fromAddress: "0x625900dc0085c79ee1032718daa3c2a33dfd2260",
  });
  console.log("Erc20 Txs :: ", erc20txHistory);
}

(async () => {
  await getEth();
})();
