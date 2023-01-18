import DojimaChain from "../src/core/dojima/client";
import {Network} from "../src/core/client";

async function checkDojima() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const dojClient = new DojimaChain({
        phrase,
        network: Network.Testnet,
        rpcUrl: 'https://api-test.d11k.dojima.network:8545/',
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const address = dojClient.getAddress()
    console.log(address)
    const balance = await dojClient.getBalance(address)
    console.log(balance)
    const gasFee = await dojClient.getFees(0.01)
    console.log(gasFee)
    const hash = await dojClient.transfer({
        recipient:'0xD526D5f47f863eFf32B99bC4F9e77DdB4bD2929b',
        amount: 0.01
    })
    console.log(hash)
    const txData = await dojClient.getTransactionData('0x6fa8ae201698a87b4694f7b1da142f7d6f34e6eaa84eedecce6e291d0c9976f1')
    console.log(txData)
}

(async () => {
    await checkDojima();
})();