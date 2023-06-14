import EthereumChain from "../../src/core/eth_dojima/client";
import {Network} from "../../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthereumChain({
        phrase,
        network: Network.DojTestnet,
        rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        // rpcUrl: 'https://eth-test.h4s.dojima.network/',
        // rpcUrl: 'http://localhost:9545'
        // network: Network.Testnet,
        // rpcUrl: 'https://goerli.infura.io/v3/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const address = ethClient.getAddress()
    console.log(address)
    const balance = await ethClient.getBalance(address)
    console.log(balance)
    const inboundbalance = await ethClient.getBalance("0xd526d5f47f863eff32b99bc4f9e77ddb4bd2929b")
    console.log(inboundbalance)
}

(async () => {
    await checkEth();
})();