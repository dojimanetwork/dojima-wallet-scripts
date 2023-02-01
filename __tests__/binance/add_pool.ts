import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.DojTestnet,
        dojClientUrl: 'https://bnb-test.h4s.dojima.network'
    });
    const inboundAddress = await bnbClient.getBinanceInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const liquidityPoolHash = await bnbClient.addLiquidityPool(
        10,
        inboundAddress,
        'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'      // optional
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
}

(async () => {
    await checkBinance();
})();