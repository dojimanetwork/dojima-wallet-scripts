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
    const inboundAddress = await solClient.getSolanaInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const liquidityPoolHash = await solClient.addLiquidityPool(
        50,
        inboundAddress,
        'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'              // optional
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
}

(async () => {
    await checkSolana();
})();