import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.DojTestnet,
        // dojClientUrl: 'https://bnb-test.h4s.dojima.network'
        dojClientUrl: 'http://localhost:26660'
    });
    const inboundAddress = await bnbClient.getBinanceInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    // const arswapHash = await bnbClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    // console.log('AR Swap tx hash : ', arswapHash)
    // const d11kswapHash = await bnbClient.swap(0.1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    // console.log('Api hash data :: ', await getHashData(d11kswapHash))
    // const dotswapHash = await bnbClient.swap(3,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
    // console.log('DOT Swap tx hash : ', dotswapHash)  //   39.999625  40.0479702  37.0475952
    // const ethswapHash = await bnbClient.swap(5,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    // console.log('ETH Swap tx hash : ', ethswapHash)  // 39.999625    42.4927705   37.4923955
    const solswapHash = await bnbClient.swap(3,'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
    console.log('SOL Swap tx hash : ', solswapHash)  // 37.4923955  34.4920205  35.30794302
}

(async () => {
    await checkBinance();
})();