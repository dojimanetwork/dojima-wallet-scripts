import {SolanaClient} from "../src/core/solana";
import {Network} from "@d11k-ts/client";

async function checkBnb() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({phrase, network: Network.Stagenet});
    const address = await solClient.getAddress();
    console.log("Address :: ", address);
    const bal = await solClient.getBalance(
        "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"
    );
    console.log("Balance :: ", bal);
    const data = await solClient.getTransactionData("3Z37cJNqKxPsDb9hdiqdjf2BrbLZRsEq2pvHMrKUGSdFPLRydxJqtJqd4m8KJnQ31vjtArzTRy5b3zdg7ymGDaTr");
    console.log("Tx data : ", data);
    const fees = await solClient.getFees();
    console.log("Fees : ", fees.fast);
    const txs = await solClient.getTransactionsHistory({address: "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"});
    console.log("Txs : ", txs);
    const hash = await solClient.transfer({amount: 0.0001, recipient: 'G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n'});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkBnb();
})();