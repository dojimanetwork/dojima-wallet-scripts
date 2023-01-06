import EthChain from "../src/core/eth_dojima/client";
import {Network} from "../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthChain(phrase, Network.Testnet)
    const address = ethClient.getAddress()
    console.log(address)
    const balance = await ethClient.getBalance(address)
    console.log(balance)
    // const gasFee = await ethClient.getFees()
    // console.log(gasFee)
    const hash = await ethClient.transfer('0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4', 0.01)
    console.log(hash)
    const txData = await ethClient.getTransactionData('0x28a150a5687e6efdfe1279f2132c91c441831db504f686e7f1738e6205cb7e5e')
    console.log(txData)
}

(async () => {
    await checkEth();
})();