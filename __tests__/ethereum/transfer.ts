import EthChain from "../../src/core/eth_dojima/client";
import {Network} from "@d11k-ts/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthChain({
        phrase,
        network: Network.Testnet,
        rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const hash = await ethClient.transfer({
        recipient: '0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b',
        amount: 0.01
    })
    console.log(hash)
}

(async () => {
    await checkEth();
})();