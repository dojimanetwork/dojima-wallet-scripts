import {SolanaClient} from "../../src/core/solana";
import {Network} from "../../src/core/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.DojTestnet,
        // endpoint: 'https://sol-test.h4s.dojima.network:8899'
        endpoint: 'http://127.0.0.1:8899'
    });
    const txs = await solClient.getTransactionsHistory({address: "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"});
    console.log("Txs : ", txs);
}

(async () => {
    await checkSolana();
})();