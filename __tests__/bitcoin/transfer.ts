import {BitcoinClient, BTC_DECIMAL} from '../../src/core/bitcoin';
import {Network} from "../../src/core/client";
import {
    assetAmount,
    assetToBase,
    AssetBTC
} from "../../src/core/utils";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.Testnet});
    let amount = assetToBase(assetAmount(0.001,  BTC_DECIMAL))
    const hash = await btcClient.transfer({amount, recipient: 'tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', asset: AssetBTC});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkBtc();
})();