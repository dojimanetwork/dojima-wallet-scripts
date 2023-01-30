import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "@d11k-ts/client";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.Testnet,
        provider: 'wss://dotws-test.h4s.dojima.network:9944'
    });
    const inboundAddress = await polkaClient.getPolkadotInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const d11kswapHash = await polkaClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('D11K Swap tx hash : ', d11kswapHash)
    const arswapHash = await polkaClient.swap(3,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    console.log('AR Swap tx hash : ', arswapHash)
    const bnbswapHash = await polkaClient.swap(3,'BNB.BNB', inboundAddress, 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu')
    console.log('BNB Swap tx hash : ', bnbswapHash)
    const ethswapHash = await polkaClient.swap(2,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    console.log('ETH Swap tx hash : ', ethswapHash)
    const solswapHash = await polkaClient.swap(3,'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
    console.log('SOL Swap tx hash : ', solswapHash)
    process.exit()
}

(async () => {
    await checkPolka();
})();