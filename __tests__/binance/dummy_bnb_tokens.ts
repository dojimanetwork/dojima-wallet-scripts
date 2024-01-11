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
    let amount = assetToBase(assetAmount(10, 8 ))
    const hash = await bnbClient.transfer({
        amount,
        recipient: 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu'
    });
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkBinance();
})();