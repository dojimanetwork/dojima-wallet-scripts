import {BitcoinClient} from '../../src/core/bitcoin';
import {Network} from "../../src/core/client";
import {
    baseToAsset,
    AssetBTC
} from "../../src/core/utils";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.Mainnet});
    const address = btcClient.getAddress();
    console.log("Address :: ", address);
    const bal = await btcClient.getBalance(
        "tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp",
        [AssetBTC]
    );
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
}

(async () => {
    await checkBtc();
})();