import {Client} from '../src/core/cosmos';
import {Network} from "../src/core/client";
import {
    assetAmount,
    assetToBase,
    baseToAsset
} from "@d11k-ts/utils";
import { COSMOS_DECIMAL } from '../src/core/cosmos'

async function checkAtom() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const atomClient = new Client({phrase, network: Network.Testnet});
    const address = atomClient.getAddress();
    console.log("Address :: ", address);
    const bal = await atomClient.getBalance(
        "cosmos1twx4xxktuzau88g6ts2k5exzue5azre336h6vm"
    );
    // console.log((baseToAsset(bal[1].amount)).amount().toNumber());
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await atomClient.getTransactionData("EADBE10F07F31A29577280690490F1D64E957C225A3A765459BD5997A4646CD2");
    console.log("Tx data : ", data);
    const fees = await atomClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    const txs = await atomClient.getTransactions({address: "cosmos1twx4xxktuzau88g6ts2k5exzue5azre336h6vm"});
    console.log("Txs : ", txs);
    let amount = assetToBase(assetAmount(0.1,  COSMOS_DECIMAL))
    const hash = await atomClient.transfer({amount, recipient: 'cosmos1twx4xxktuzau88g6ts2k5exzue5azre336h6vm'});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkAtom();
})();