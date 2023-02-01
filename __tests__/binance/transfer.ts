import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";
import {assetAmount, assetToBase} from "@d11k-ts/utils";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.DojTestnet,
        dojClientUrl: 'https://bnb-test.h4s.dojima.network'
    });
    let amount = assetToBase(assetAmount(1, 8 ))
    const hash = await bnbClient.transfer({
        amount,
        recipient: 'tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va'
    });
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkBinance();
})();