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
    let SOLamount = assetToBase(assetAmount(150, DOJ_DECIMAL ))
    const soldepositHash = await hermesClient.deposit({amount: SOLamount, memo: `SWAP:SOL.SOL:DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS`})
    console.log('SOL Swap tx hash :: ', soldepositHash)
}

(async () => {
    await checkHermes();
})();