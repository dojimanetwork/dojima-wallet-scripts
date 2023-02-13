import EthereumChain from "../../src/core/eth_dojima/client";
import {Network} from "../../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthereumChain({
        phrase,
        network: Network.DojTestnet,
        // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        // rpcUrl: 'https://eth-test.h4s.dojima.network/',
        rpcUrl: 'http://localhost:9545'
        // network: Network.Testnet,
        // rpcUrl: 'https://goerli.infura.io/v3/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const inboundAddress = await ethClient.getEthereumInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const liquidityPoolHash = await ethClient.addLiquidityPool(
        10,
        inboundAddress,
        'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'          // optional
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
}

(async () => {
    await checkEth();
})();