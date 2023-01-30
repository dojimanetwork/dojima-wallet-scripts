import {BinanceBeaconClient} from "../src/core/binance";
import {Network} from "@d11k-ts/client";
import {AssetBNB} from "@d11k-ts/utils";
import {
    assetAmount,
    assetToBase,
    baseToAsset
} from "@d11k-ts/utils";
import {BncStagenetClient} from "../src/core/binance/stagenet/stagenet-client";

async function checkBnb() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    // "female hidden they what snack exist become vast method law moon decrease"

    // const bnbClient = new BinanceClient({phrase, network: Network.Mainnet});
    // const address = bnbClient.getAddress();
    // console.log("Address :: ", address);
    // const bal = await bnbClient.getBalance(
    //     "bnb18ajcdmv3c6w08sk8ayv75ks87y2w4hghntcxvd", [AssetBNB]
    // );
    // const balance = (baseToAsset(bal[0].amount)).amount();
    // console.log("Balance :: ", balance.toNumber());
    const bnbClient = new BinanceBeaconClient({phrase, network: Network.Testnet});
    const address = bnbClient.getAddress();
    console.log("Address :: ", address);
    const bal = await bnbClient.getBalance(
        // "tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va", [AssetBNB]
        'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu', [AssetBNB]  // 116589105
    );
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await bnbClient.getTransactionData("F1DD0E719D5238CE2AC55CAFAA11126D4563DF3622FB2DC6B4E7E784A25B5238");
    console.log("Tx data : ", data);
    const fees = await bnbClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    const txs = await bnbClient.getTransactions({address: "tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va"});
    console.log("Txs : ", txs);
    let amount = assetToBase(assetAmount(0.0001, 8 ))
    const hash = await bnbClient.transfer({amount, recipient: 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu'});
    console.log("Tx hash : ", hash);

    const bnbInst = new BncStagenetClient(phrase, 'https://bnb-test.h4s.dojima.network')
    const balStage = await bnbInst.getBalance('tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu')
    console.log("Balance :: ", balStage)
    const txHash = await bnbInst.transfer(
        // 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu',
        'tbnb1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pezkgkh4',
        2,
        'ADD:BNB.BNB:dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'
    )
    console.log('Tx hash :: ', txHash)
}

(async () => {
    await checkBnb();
})();