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
    // const d11kswapHash = await ethClient.swap(0.01,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    // console.log('D11K Swap tx hash : ', d11kswapHash)
    // const arswapHash = await ethClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    // console.log('AR Swap tx hash : ', arswapHash)
    // const bnbswapHash = await ethClient.swap(3,'BNB.BNB', inboundAddress, 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu')
    // console.log('BNB Swap tx hash : ', bnbswapHash)  // 4712.366482869645   4709.366482869645   4710.511353559645
    // const dotswapHash = await ethClient.swap(2,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
    // console.log('DOT Swap tx hash : ', dotswapHash)  // 4710.511353559645   4708.511353559645  4708.933339769645
    const solswapHash = await ethClient.swap(3,'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
    console.log('SOL Swap tx hash : ', solswapHash)  // 4708.933339769645  4705.933339769645  4706.706368109644
}

(async () => {
    await checkEth();
})();