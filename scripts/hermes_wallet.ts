import {
    DOJDECIMAL,
    HermesSdkClient} from "../src/core/hermes";
import {Network} from "@d11k-ts/client";
import {AssetDOJNative, baseToAsset} from "@d11k-ts/utils";
import {assetAmount, assetToBase} from "@d11k-ts/utils";

async function checkHermes() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut"

    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const address = hermesClient.getAddress();
    console.log("Address :: ", address);
    const bal = await hermesClient.getBalance(
        "dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km",
        [AssetDOJNative]
    );
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await hermesClient.getTransactionData("6067CAC67EC27477B48C67237198964FFCD8FBC2F5C0CECA075D278192B45A1B", 'dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje');
    console.log("Tx data : ", data);
    // const data = await hermesClient.getDepositTransaction("A3DF03145C299F20E82E58762D26E2EBE0E9C663CBBF9DE57AE77FDA35634A0E");
    // console.log("Deposit Tx data : ", data);
    const fees = await hermesClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    const txs = await hermesClient.getTransactions({address: "dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km"});
    console.log("Txs : ", txs);
    let amount = assetToBase(assetAmount(1, DOJDECIMAL ))
    const hash = await hermesClient.transfer({amount, recipient: 'dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje'});
    console.log("Tx hash : ", hash);
    const depositHash = await hermesClient.deposit({amount, memo: `SWAP:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`})
    console.log('Deposit tx hash :: ', depositHash)
}

(async () => {
    await checkHermes();
})();