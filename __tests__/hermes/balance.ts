import {
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {
    AssetDOJNative,
    baseToAsset,
} from "../../src/core/utils";

async function checkHermes() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km

    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const address = hermesClient.getAddress();
    console.log("Address :: ", address);
    const bal = await hermesClient.getBalance(
        // 'dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58',
        // 'dojima1jdkd8n8h3s8mc4vctzvmxwndtcumejvrn00xln',
        "dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km",
        // "dojima1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pev8my62",  // bond address
        [AssetDOJNative]
    );
    // console.log(bal)
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
}

(async () => {
    await checkHermes();
})();