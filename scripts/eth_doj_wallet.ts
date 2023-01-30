import EthChain from "../src/core/eth_dojima/client";
import {Network} from "../src/core/client";

async function checkEth() {
    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const ethClient = new EthChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://eth-test.h4s.dojima.network:9545/',
        rpcUrl: "https://eth-test.h4s.dojima.network/",
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
    const txData = await ethClient.getTransactionData('0xc58f2e93b39f869bfb13871027834ef29d301acd9d472c26b444b48e7501c9ab')
    console.log(txData)
    const inboundAddress = await ethClient.getEthereumInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const LPDefaultGasFee = await ethClient.getDefaultLiquidityPoolGasFee();
    console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)
    const liquidityPoolHash = await ethClient.addLiquidityPool(5, inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('Liquidity pool hash : ', liquidityPoolHash)
    const d11kswapHash = await ethClient.swap(0.01,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('Swap tx hash : ', d11kswapHash)
    const arswapHash = await ethClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    console.log('Swap tx hash : ', arswapHash)
    const dotswapHash = await ethClient.swap(2,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
    console.log('Swap tx hash : ', dotswapHash)
}

(async () => {
    await checkEth();
})();