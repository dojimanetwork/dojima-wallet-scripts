import BitcoinAccount from "../src/accounts/bitcoin_account";
import chains from "../src/balance";

async function btc() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
  const btcAcc = new BitcoinAccount("testnet");
  const address = btcAcc.getAddress(phrase);
  console.log("Address : ", address);
  const btc = new chains.BitcoinChain("testnet");
  const bal = await btc.getBalance(address);
  console.log("Balance generated : ", bal);
  const gasFee = await btc.getGasFee(
    0.00001,
    'globe sock famous ocean idle float law brown shallow imitate master asthma',
    1,
    "tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny"
  );
  console.log('Gas fee : ',gasFee);
  // console.time('Tx')
  // const buildTx = await btc.buildTransaction('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, 1);
  // console.timeEnd('Tx')
  // console.log('build tx : ',buildTx);
  // console.time('Tx')
  // const tx = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001);
  // console.timeEnd('Tx')
  // console.log('Tx generated : ',tx);
  // console.time('Tx1')
  // const tx1 = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, gasFee.slow.fee);
  // console.timeEnd('Tx1')
  // console.log('Tx generated : ',tx1);
  // console.time('Tx2')
  // const tx2 = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, gasFee.average.fee);
  // console.timeEnd('Tx2')
  // console.log('Tx generated : ',tx2);
  // console.time('Tx3')
  // const tx3 = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, gasFee.fast.fee);
  // console.timeEnd('Tx3')
  // console.log('Tx generated : ',tx3);
  // return bal;
  const rawTxDetails = await btc.rawTransaction(
    0.00001,
    phrase,
    "tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny",
    1
  );
  console.log('Raw Tx Details :: ', rawTxDetails)
  const txHash = await btc.transfer(rawTxDetails.tx_hex);
  console.log('Tx hash :: ', txHash);
}

console.log(btc());
