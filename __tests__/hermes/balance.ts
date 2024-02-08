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
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58    tdojima1dthjqgqld5zwryug7d9kg2kwal4tugwm0l4p2y
        // "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km   tdojima1semkpr46vgz7n27rahnwa69vwmvkhkp74e9nnh
        // "wink umbrella toss bleak patient extend palm asthma divorce quit track planet depend tenant mimic shiver girl segment lend unit body account monster lizard"; // dojima1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pev8my62    tdojima1v4qznsctumvc4hygg9tqjsx242tglgw4csn5qf
        // "message nut rain immune rifle fall legend floor cradle spin season sting couch age swap seminar melt cable life battle island impose cradle brass"; // tdojima1mcle7k7nyvtjvhe2mn5686mfc7vupz4gcq6rgk
        // "obvious august river model legend pipe little fossil chase chicken good math lake dash wage trim tenant ramp absorb soon network piece boil during"; // tdojima10332e7pfldstrvykp830mk5r3tf3ujq5njsann
    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const address = hermesClient.getAddress();
    console.log("Address :: ", address);
    const bal = await hermesClient.getBalance(
        address,
        // 'dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58',
        // 'dojima1jdkd8n8h3s8mc4vctzvmxwndtcumejvrn00xln',
        // "dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km",
        // "dojima1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pev8my62",  // bond address
        // "sdojima1f9e0kwr5mqj9jgdvqlw9205zcj6x8w7v7nup59"
        [AssetDOJNative]
    );
    // console.log(bal)
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
}

(async () => {
    await checkHermes();
})();