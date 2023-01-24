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
    const txData = await ethClient.getTransactionData('0xc58f2e93b39f869bfb13871027834ef29d301acd9d472c26b444b48e7501c9ab')
    console.log(txData)
}

(async () => {
    await checkEth();
})();