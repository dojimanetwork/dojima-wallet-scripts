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

    const hermesClient = new HermesSdkClient({phrase, network: Network.DojTestnet});
    let ETHamount = assetToBase(assetAmount(9500, DOJ_DECIMAL ))
    const ethdepositHash = await hermesClient.deposit({amount: ETHamount, memo: `ADD:ETH.ETH:0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4`})
    console.log('ETH Deposit tx hash :: ', ethdepositHash)
}

(async () => {
    await checkHermes();
})();