import {SolanaClient} from "../../src/core/solana";
import {Network} from "@d11k-ts/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.Stagenet,
        endpoint: 'https://sol-test.h4s.dojima.network:8899'
        // endpoint: 'http://127.0.0.1:8899'
    });
    const data = await solClient.getTransactionData("357nyGWmJJGYP5wL4RqP8YqmstpXpmsTzpTtPHvN64SDBjmQmSEAi5iBJveUMn4NVbpsLf1NJRcxbGsGChF9K3vi");
    console.log("Tx data : ", data);
}

(async () => {
    await checkSolana();
})();