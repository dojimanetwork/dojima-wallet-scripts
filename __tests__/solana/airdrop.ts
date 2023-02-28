import {SolanaClient} from "../../src/core/solana";
import {Network} from "../../src/core/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.DojTestnet,
        endpoint: 'https://sol-test.h4s.dojima.network:8899'
        // endpoint: 'http://127.0.0.1:8899'
    });
    const address = await solClient.getAddress();
    console.log("Address :: ", address);
    const requestAirdrop = await solClient.requestSolTokens(
        'https://sol-test.h4s.dojima.network:8899',
        // 'http://127.0.0.1:8899',
        address
        // '82iP5jLLyiuTHbQRrSwUgZ6sKycT2mjbNkncgpm7Duvg'
    )
    console.log("Airdrop hash :: ", requestAirdrop)
    const bal = await solClient.getBalance(
        "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"
    );
    console.log("Balance :: ", bal);
}

(async () => {
    await checkSolana();
})();