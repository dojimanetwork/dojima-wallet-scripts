import {
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";

async function checkHermes() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km

    const hermesClient = new HermesSdkClient({phrase, network: Network.DojTestnet});
    const txs = await hermesClient.getTransactions({address: "dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58"});
    console.log("Txs : ", txs);
}

(async () => {
    await checkHermes();
})();