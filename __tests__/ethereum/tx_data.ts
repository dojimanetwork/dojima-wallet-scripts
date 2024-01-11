import EthereumChain from "../../src/core/eth_dojima/client";
import {Network} from "../../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthereumChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        rpcUrl: 'https://eth-test.h4s.dojima.network/',
        // network: Network.Testnet,
        // rpcUrl: 'https://goerli.infura.io/v3/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const txData = await ethClient.getTransactionData('8F6A92B2B125FA1FE7F76911BFD5D2B79B6B7BF5C8D0E7A856A12A06FA0A8525')
    console.log(txData)
    // const txData = await ethClient.getTransactionData('0x736a3e9b5f2dcde6f2f2f443a0e688b82f4d14c03496292add02154aa4975a30')
    // console.log(txData)
}

(async () => {
    await checkEth();
})();