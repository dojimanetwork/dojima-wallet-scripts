import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "../../src/core/client";
// import {getHashData} from "../utils";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.DojTestnet,
        // provider: 'wss://dotws-test.h4s.dojima.network:9944'
        provider: 'ws://localhost:9944'
    });
    const inboundAddress = await polkaClient.getPolkadotInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    // const d11kswapHash = await polkaClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    // console.log('D11K Swap tx hash : ', d11kswapHash)
    // const arswapHash = await polkaClient.swap(3,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    // console.log('AR Swap tx hash : ', arswapHash)
    // const bnbswapHash = await polkaClient.swap(5,'BNB.BNB', inboundAddress, 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu')
    // console.log('BNB Swap tx hash : ', bnbswapHash)  //  39.999758186022   34.999517540178   36.21517486812
    // const ethswapHash = await polkaClient.swap(5,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    // console.log('ETH Swap tx hash : ', ethswapHash)  // 40.014933716537   40.362711921569  35.362472926218
    const solswapHash = await polkaClient.swap(5,'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
    console.log('SOL Swap tx hash : ', solswapHash)  // 35.362472926218  30.362232274423  34.348267166294
    process.exit()
}

(async () => {
    await checkPolka();
})();