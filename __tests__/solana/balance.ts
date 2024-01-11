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
    const address = await solClient.getAddress();
    console.log("Address :: ", address);
    const bal = await solClient.getBalance(
        "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"
        // "82iP5jLLyiuTHbQRrSwUgZ6sKycT2mjbNkncgpm7Duvg"
    );
    console.log("Balance :: ", bal);
    const inboundBal = await solClient.getBalance(
        // "82iP5jLLyiuTHbQRrSwUgZ6sKycT2mjbNkncgpm7Duvg"
        "5fxyp8GDtGWcesu6R42pjFdBhXrwNJ3xyZXnKWTfNLAe"
    );
    console.log("Inbound Balance :: ", inboundBal);
}

(async () => {
    await checkSolana();
})();