import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "../../src/core/client";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.DojTestnet,
        provider: 'wss://dotws-test.h4s.dojima.network:9944'
    });
    const inboundAddress = await polkaClient.getPolkadotInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const liquidityPoolHash = await polkaClient.addLiquidityPool(
        10,
        inboundAddress,
        'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'      // optional
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
    process.exit()
}

(async () => {
    await checkPolka();
})();