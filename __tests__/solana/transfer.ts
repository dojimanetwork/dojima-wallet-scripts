import {SolanaClient} from "../../src/core/solana";
import {Network} from "../../src/core/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.Testnet,
        // endpoint: 'https://sol-test.h4s.dojima.network:8899'
        endpoint: 'https://sol-test.h4s.dojima.network'
        // endpoint: 'http://127.0.0.1:8899'
    });
    const hash = await solClient.transfer({
        amount: 1,
        recipient: 'G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n'
    });
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkSolana();
})();