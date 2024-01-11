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
    let DOTamount = assetToBase(assetAmount(230, DOJ_DECIMAL ))
    const dotdepositHash = await hermesClient.deposit({amount: DOTamount, memo: `ADD:DOT.DOT`})
    console.log('DOT Deposit tx hash :: ', dotdepositHash)
    // let DOTamount = assetToBase(assetAmount(1, DOJ_DECIMAL ))
    // const dotdepositHash = await hermesClient.deposit({amount: DOTamount, memo: `WITHDRAW:DOT.DOT:10000`})
    // console.log('DOT Deposit tx hash :: ', dotdepositHash) // 22867549.40366008  22872589.70867091
}

(async () => {
    await checkHermes();
})();