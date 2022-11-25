import Client from "../src/core/btc/client";

async function checkBitcoin() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  const btcClient = new Client("testnet");
  const address = btcClient.getAddress(phrase);
  console.log("Address :: ", address);
  const bal = await btcClient.getBalance(
    "tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp"
  );
  console.log("Balance :: ", bal);
  const rawTxResult = await btcClient.createTransaction(
    0.00001,
    "tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp",
    "tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny",
    phrase,
    1,
    "SWAP:BTC.BTC"
  );
  console.log("Tx Hex :: ", rawTxResult.tx_hex);
  console.log("Tx Gas Fee :: ", rawTxResult.gas_fee);
  const hash = await btcClient.transfer(rawTxResult.tx_hex);
  console.log("Tx Hash :: ", hash);
}

(async () => {
  await checkBitcoin();
})();
