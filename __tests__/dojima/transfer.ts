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
    const hash = await dojClient.transfer({
        recipient:'0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b',
        amount: 0.01
    })
    console.log(hash)
}

(async () => {
    await checkDojima();
})();