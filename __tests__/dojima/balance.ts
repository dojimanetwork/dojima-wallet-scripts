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
    const address = dojClient.getAddress()
    console.log(address)
    const balance = await dojClient.getBalance(address)
    console.log(balance)
}

(async () => {
    await checkDojima();
})();