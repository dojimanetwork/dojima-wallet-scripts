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
    let ARamount = assetToBase(assetAmount(350, DOJ_DECIMAL ))
    const ardepositHash = await hermesClient.deposit({amount: ARamount, memo: `ADD:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`})
    console.log('AR Deposit tx hash :: ', ardepositHash)
    // const ardepositHash = await hermesClient.deposit({amount: ARamount, memo: `-:AR.AR:10000`})
    // console.log('AR Withdraw tx hash :: ', ardepositHash)
}

(async () => {
    await checkHermes();
})();