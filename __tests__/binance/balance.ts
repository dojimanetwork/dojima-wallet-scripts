import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";
import {AssetBNB, baseToAsset} from "@d11k-ts/utils";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.DojTestnet,
        // dojClientUrl: 'https://bnb-test.h4s.dojima.network'
        dojClientUrl: 'http://localhost:26660'
    });
    const address = bnbClient.getAddress();
    console.log("Address :: ", address);
    const bal = await bnbClient.getBalance(
        'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu', [AssetBNB]
    );
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber()); // 49.998875  46.9985  47.47633319
}

(async () => {
    await checkBinance();
})();