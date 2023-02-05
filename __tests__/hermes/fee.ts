import {
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {baseAmount, baseToAsset} from "@d11k-ts/utils";

async function checkHermes() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km

    const hermesClient = new HermesSdkClient({phrase, network: Network.DojTestnet});
    const fees = await hermesClient.getFees();
    // console.log("Fees : ", Number(fees.fastest.amount()));
    console.log("Fees : ", Number(baseToAsset(baseAmount(fees.fastest.amount())).amount()))
}

(async () => {
    await checkHermes();
})();