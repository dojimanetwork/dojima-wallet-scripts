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
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        // "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km
        // "message nut rain immune rifle fall legend floor cradle spin season sting couch age swap seminar melt cable life battle island impose cradle brass";
    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    let amount = assetToBase(assetAmount(1000000, DOJ_DECIMAL ))
    const hash = await hermesClient.transfer({amount, recipient: 'tdojima1dthjqgqld5zwryug7d9kg2kwal4tugwm0l4p2y'});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkHermes();
})();