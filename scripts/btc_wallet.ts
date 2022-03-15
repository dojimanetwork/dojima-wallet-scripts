import { chains } from "../src/balance";

async function btc() {
    const btc = new chains.BitcoinChain('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    const client = btc.init();
    const bal = await btc.getBalance(client);
    // console.log('Balance generated : ',bal);
    const gasFee = await btc.getGasFee(client);
    // console.log('Gas fee : ',gasFee);
    // console.time('Tx')
    // const tx = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, client);
    // console.timeEnd('Tx')
    // console.log('Tx generated : ',tx);
    // console.time('Tx1')
    const tx1 = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, client, gasFee.slow.fee);
    // console.timeEnd('Tx1')
    // console.log('Tx generated : ',tx1);
    // console.time('Tx2')
    const tx2 = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, client, gasFee.average.fee);
    // console.timeEnd('Tx2')
    // console.log('Tx generated : ',tx2);
    // console.time('Tx3')
    const tx3 = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, client, gasFee.fast.fee);
    // console.timeEnd('Tx3')
    // console.log('Tx generated : ',tx3);
    // return bal;
}

console.log('Balance : ', btc());
