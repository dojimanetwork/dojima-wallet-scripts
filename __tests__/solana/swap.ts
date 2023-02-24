import {SolanaClient} from "../../src/core/solana";
import {Network} from "../../src/core/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.DojTestnet,
        // endpoint: 'https://sol-test.h4s.dojima.network:8899'
        endpoint: 'http://127.0.0.1:8899'
    });
    const inboundAddress = await solClient.getSolanaInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    // const d11kswapHash = await solClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    // console.log('DOJ Swap tx hash : ', d11kswapHash)
    const arswapHash = await solClient.swap(1,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    console.log('AR Swap tx hash : ', arswapHash)
    // const bnbswapHash = await solClient.swap(5,'BNB.BNB', inboundAddress, 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu')
    // console.log('BNB Swap tx hash : ', bnbswapHash)
    // const ethswapHash = await solClient.swap(5,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    // console.log('ETH Swap tx hash : ', ethswapHash)
    // const dotswapHash = await solClient.swap(1,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
    // console.log('DOT Swap tx hash : ', dotswapHash)
}

(async () => {
    await checkSolana();
})();