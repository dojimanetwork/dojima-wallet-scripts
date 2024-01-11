import EthereumChain from "../../src/core/eth_dojima/client";
import {Network} from "../../src/core/client";

async function checkEth() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const ethClient = new EthereumChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        rpcUrl: 'https://eth-test.h4s.dojima.network/',
        // rpcUrl: 'http://localhost:9545'
        // network: Network.Testnet,
        // rpcUrl: 'https://goerli.infura.io/v3/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    });
    const inboundAddress = await ethClient.getEthereumInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const txHash = await ethClient.dummyTx(inboundAddress, 55.04061599)
    console.log('Tx hash :: ', txHash);
    // 0x86658c3e12767fcfe59c96c9c1394f12cf70269fa7033c3e393bb4ab33ce4949
    // 0xca4de370ff6a45d2311a13c842d232cbea2548bc298aeaeb43a6b89d2b9caec9
}

(async () => {
    await checkEth();
})();