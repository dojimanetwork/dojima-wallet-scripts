import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";
import {assetAmount, assetToBase} from "@d11k-ts/utils";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.Testnet,
        dojClientUrl: 'https://bnb-test.h4s.dojima.network'
        // dojClientUrl: 'http://localhost:26660'
    });
    const inboundAddress = await bnbClient.getBinanceInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    let amount = assetToBase(assetAmount(1, 8 ))
    const txHash = await bnbClient.dummyTx(inboundAddress, amount)
    console.log('Tx hash :: ', txHash);
}

(async () => {
    await checkBinance();
})();