import {
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";

async function checkHermes() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km

    const hermesClient = new HermesSdkClient({phrase, network: Network.DojTestnet});
    const data = await hermesClient.getTransactionData("EE73E6BC4C3CA1A7D3DABDD8561F3899D5B4135FB4806AACA81534B7EC2F4E43", 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km');
    console.log("Tx data : ", data);
    // const data = await hermesClient.getDepositTransaction("E6739CCD9DB13B90E651833BD9533D2A1C8109E789767586E2A01E8FFA20392B");
    // console.log("Deposit Tx data : ", data);
}

(async () => {
    await checkHermes();
})();