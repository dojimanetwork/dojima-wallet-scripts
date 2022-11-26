import {BitcoinClient} from '../src/core/bitcoin';
import {Network} from "../src/core/client";
import {
    assetAmount,
    assetToBase,
    baseToAsset,
    AssetBTC
} from "@d11k-ts/utils";
import { BTC_DECIMAL } from "../src/core/bitcoin";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.Testnet});
    const address = btcClient.getAddress();
    console.log("Address :: ", address);
    const bal = await btcClient.getBalance(
        "tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp",
        [AssetBTC]
    );
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await btcClient.getTransactionData("960fc663be2201df93d28ed8a97de24ca28017be8406cd1f22e0962ccd6b0726");
    console.log("Tx data : ", data);
    const fees = await btcClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    const txs = await btcClient.getTransactions({address: "tb1q8w9emc5tdxwc7d3phupc8ltp0djmsnc2ngxnpp"});
    console.log("Txs : ", txs);
    let amount = assetToBase(assetAmount(0.001,  BTC_DECIMAL))
    const hash = await btcClient.transfer({amount, recipient: 'tb1qqzupd5yjn76rme297uu9q8lrfkjnfp8kfhahny', asset: AssetBTC});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkBtc();
})();