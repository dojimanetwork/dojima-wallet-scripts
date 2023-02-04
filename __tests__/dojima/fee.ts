import DojimaChain from "../../src/core/dojima/client";
import {Network} from "../../src/core/client";

async function checkDojima() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const dojClient = new DojimaChain({
        phrase,
        network: Network.DojTestnet,
        rpcUrl: 'https://api-test.d11k.dojima.network:8545/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const gasFee = await dojClient.getFees(0.01)
    console.log(gasFee)
}

(async () => {
    await checkDojima();
})();