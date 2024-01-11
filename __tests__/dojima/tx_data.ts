import DojimaChain from "../../src/core/dojima/client";
import {Network} from "../../src/core/client";

async function checkDojima() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const dojClient = new DojimaChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://api-test.d11k.dojima.network:8545/',
        rpcUrl: 'https://api-test.d11k.dojima.network/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const txData = await dojClient.getTransactionData('0xe03ec935fdc0d58660ceaad9d0da5113b0f4bbc760b012f6636d6ed6ee36b19f')
    console.log(txData)
}

(async () => {
    await checkDojima();
})();