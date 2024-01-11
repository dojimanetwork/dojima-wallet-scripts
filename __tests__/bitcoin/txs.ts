import {BitcoinClient} from '../../src/core/bitcoin';
import {Network} from "../../src/core/client";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.Testnet});
    const txs = await btcClient.getTransactions({address: "tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp"});
    console.log("Txs : ", txs);
}

(async () => {
    await checkBtc();
})();