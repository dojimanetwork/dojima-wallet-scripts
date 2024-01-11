import {SolanaClient} from "../../src/core/solana";
import {Network} from "../../src/core/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.Testnet,
        endpoint: 'https://sol-test.h4s.dojima.network'
        // endpoint: 'https://sol-test.h4s.dojima.network:8899'
        // endpoint: 'http://127.0.0.1:8899'
    });
    const data = await solClient.getTransactionData("f7d63147e5ca56bb0b920428de6914d84f5dceebcf715870a91754ba24e9a0cf");
    console.log("Tx data : ", data);
}

(async () => {
    await checkSolana();
})();