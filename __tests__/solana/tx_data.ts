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
    const data = await solClient.getTransactionData("4pvZPkkfEbnXAjzJ9HKVmb7JGMbUBGxaiE52SeFgQ1mnNUBfK9Q2ukTqXyS7mfFje4chv3hnM4nAoG2UfheqDEYk");
    console.log("Tx data : ", data);
}

(async () => {
    await checkSolana();
})();