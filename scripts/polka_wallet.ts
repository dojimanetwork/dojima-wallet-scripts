import {PolkadotClient} from '../src/core/polkadot'
import {Network} from "@d11k-ts/client";

// import {cryptoWaitReady} from "@polkadot/util-crypto";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    // "blade night lawn zone clown cannon wheat day found head enable fury"

    // await cryptoWaitReady();
    const polkaClient = new PolkadotClient({ phrase, network: Network.Testnet, provider: 'wss://dotws-test.h4s.dojima.network:9944' });
    const address = await polkaClient.getAddress();
    console.log("Address :: ", address);
    const bal = await polkaClient.getBalance(
        '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH'
    );
    console.log("Balance :: ", bal);
    const fees = await polkaClient.getFees({recipient: '1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7', amount: 0.01});
    console.log("Fees : ", fees);
    const hash = await polkaClient.transfer({recipient: '5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6', amount: 0.01});
    console.log("Tx hash : ", hash);
    const inboundAddress = await polkaClient.getPolkadotInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const LPDefaultGasFee = await polkaClient.getDefaultLiquidityPoolGasFee();
    console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)
    const liquidityPoolHash = await polkaClient.addLiquidityPool(5, inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('Liquidity pool hash : ', liquidityPoolHash)
    // const swapHash = await polkaClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    // console.log('Swap tx hash : ', swapHash)
    const swapHash = await polkaClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    console.log('Swap tx hash : ', swapHash)
    process.exit()
}

(async () => {
    await checkPolka();
})();