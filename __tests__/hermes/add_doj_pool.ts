import {
    DOJ_DECIMAL,
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {
    assetAmount,
    assetToBase
} from "../../src/core/utils";

async function checkHermes() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km

    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    let DOJamount = assetToBase(assetAmount(100, DOJ_DECIMAL ))
    const dojhdepositHash = await hermesClient.deposit({amount: DOJamount, memo: `ADD:DOJ.DOJ:0xa14655A5e856564341B4a659eff54E1932c9afD3`})
    console.log('DOJ Deposit tx hash :: ', dojhdepositHash)
    // let DOJamount = assetToBase(assetAmount(1, DOJ_DECIMAL ))
    // const dojhdepositHash = await hermesClient.deposit({amount: DOJamount, memo: `WITHDRAW:DOJ.DOJ:1000`})
    // console.log('DOJ Deposit tx hash :: ', dojhdepositHash)
}
// "balance_doj": "16789.07285917",
//     "balance_asset": "9.00360483",
//     "balance_doj": "16778.43181693",
//     "balance_asset": "7.37875236",
// "balance_doj": "13743.18702426",
//     "balance_asset": "7.37875236",
// "balance_doj": "12370.17763965",
//     "balance_asset": "6.64460115",
    (async () => {
    await checkHermes();
})();