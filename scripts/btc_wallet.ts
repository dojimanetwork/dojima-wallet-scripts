import { chains } from "../src/balance";

async function btc() {
    const btc = new chains.BitcoinChain('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'testnet');
    const client = btc.init();
    const bal = await btc.getBalance(client);
    console.log('Balance generated : ',bal);
    const tx = await btc.createTransactionAndSend('tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', 0.00001, client);
    console.log('Tx generated : ',tx);
    return bal;
}

console.log('Balance : ', btc());
