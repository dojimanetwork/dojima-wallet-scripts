import EthChain from "../src/core/eth_dojima/client";
import {Network} from "../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthChain({
        phrase,
        network: Network.Testnet,
        rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const address = ethClient.getAddress()
    console.log(address)
    const balance = await ethClient.getBalance(address)
    console.log(balance)
    const gasFee = await ethClient.getFees(0.01)
    console.log(gasFee)
    const hash = await ethClient.transfer({
        recipient: '0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b',
        amount: 0.01
    })
    console.log(hash)
    const txData = await ethClient.getTransactionData('0x92c1b09b45c785864833834e73919e07e5c6463195b65bc7d1ee9cbd37c8dfc5')
    console.log(txData)
}

(async () => {
    await checkEth();
})();