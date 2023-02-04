import EthereumChain from "../../src/core/eth_dojima/client";
import {Network} from "../../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthereumChain({
        phrase,
        // DojTestnet doesn't provide txs list
        // network: Network.DojTestnet,
        // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        // rpcUrl: 'https://eth-test.h4s.dojima.network/',
        network: Network.Testnet,
        rpcUrl: 'https://goerli.infura.io/v3/',
        infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const txs = await ethClient.getTransactionsHistory({
        address: "0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4",
        apiKey: 'J19V58VEVM69RDGJHNH69M42F2J4BFDVIV',
    })
    console.log(txs)
}

(async () => {
    await checkEth();
})();