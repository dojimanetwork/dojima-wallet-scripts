import DojimaChain from "../../src/core/dojima/client";
import {Network} from "../../src/core/client";

async function checkDojima() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const dojClient = new DojimaChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://api-test.d11k.dojima.network:8545/',
        rpcUrl: 'https://api-test.d11k.dojima.network/',
    })
    const hash = await dojClient.dojimaTransfer(
        1,
        '0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b'
    )
    console.log(hash)
}

(async () => {
    await checkDojima();
})();