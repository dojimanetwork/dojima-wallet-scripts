// import DojimaClient from "../src/types/interfaces/dojima_client";
import {
    HermesSdkClient,
    DECIMAL
} from "@d11k-ts/hermes";
import {Network} from "@d11k-ts/client";
import {baseToAsset} from "@d11k-ts/utils";
import {assetAmount, assetToBase} from "@d11k-ts/utils";

async function checkDoj() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const dojClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const address = dojClient.getAddress();
    console.log("Address :: ", address);
    const bal = await dojClient.getBalance(
        "dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje"
    );
    const balance = (baseToAsset(bal[1].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await dojClient.getTransactionData("A9F5A06C5817D771A4C5B222D992D493DA13911A9C4F654EC685A5044A480249", 'dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje');
    console.log("Tx data : ", data);
    const fees = await dojClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    const txs = await dojClient.getTransactions({address: "dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje"});
    console.log("Txs : ", txs);
    let amount = assetToBase(assetAmount(0.1, DECIMAL ))
    const hash = await dojClient.transfer({amount, recipient: 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkDoj();
})();