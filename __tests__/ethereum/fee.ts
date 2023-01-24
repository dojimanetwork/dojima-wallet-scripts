import EthChain from "../../src/core/eth_dojima/client";
import {Network} from "@d11k-ts/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        rpcUrl: 'https://eth-test.h4s.dojima.network/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const gasFee = await ethClient.getFees(0.01)
    console.log(gasFee)
}

(async () => {
    await checkEth();
})();