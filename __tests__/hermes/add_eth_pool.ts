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
    let ETHamount = assetToBase(assetAmount(48000, DOJ_DECIMAL ))
    const ethdepositHash = await hermesClient.deposit({amount: ETHamount, memo: `ADD:ETH.ETH:0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4`})
    console.log('ETH Deposit tx hash :: ', ethdepositHash)
    // let ETHamount = assetToBase(assetAmount(1, DOJ_DECIMAL ))
    // const ethdepositHash = await hermesClient.deposit({amount: ETHamount, memo: `WITHDRAW:ETH.ETH:5000:ETH.ETH`})
    // console.log('ETH Deposit tx hash :: ', ethdepositHash) // 24951944.30386328  24975924.58085172  24987902.64347904  24987901.50347904 24987901.50347904
    // 4647.353294119644 4647.353294119644  4647.353294119644  4647.353294119644  4672.358101619644 4684.856301619644
    // {
    //     "balance_doj": "4800021132572",
    //     "balance_asset": "5000240000",
    //     "asset": "ETH.ETH",
    //     "LP_units": "4800000000000",
    //     "pool_units": "4800000000000",
    //     "status": "Available",
    //     "synth_units": "0",
    //     "synth_supply": "0",
    //     "pending_inbound_doj": "0",
    //     "pending_inbound_asset": "0"
    // }

    // {
    //     "balance_doj": "2399580288731",
    //     "balance_asset": "2500600000",
    //     "asset": "ETH.ETH",
    //     "LP_units": "2400000000000",
    //     "pool_units": "2400000000000",
    //     "status": "Available",
    //     "synth_units": "0",
    //     "synth_supply": "0",
    //     "pending_inbound_doj": "0",
    //     "pending_inbound_asset": "0"
    // }

    // {
    //     "balance_doj": "1199356089452",
    //     "balance_asset": "1250780000",
    //     "asset": "ETH.ETH",
    //     "LP_units": "1200000000000",
    //     "pool_units": "1200000000000",
    //     "status": "Available",
    //     "synth_units": "0",
    //     "synth_supply": "0",
    //     "pending_inbound_doj": "0",
    //     "pending_inbound_asset": "0"
    // }
}

(async () => {
    await checkHermes();
})();