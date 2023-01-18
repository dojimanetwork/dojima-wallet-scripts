import {SolanaClient} from "../src/core/solana";
import {Network} from "@d11k-ts/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({phrase, network: Network.Stagenet, endpoint: 'https://sol-test.h4s.dojima.network:8899'});
    const address = await solClient.getAddress();
    console.log("Address :: ", address);
    // const requestAirdrop = await solClient.requestSolTokens('http://127.0.0.1:8899', address)
    // console.log("Airdrop hash :: ", requestAirdrop)
    const bal = await solClient.getBalance(
        "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"
    );
    console.log("Balance :: ", bal);
    const data = await solClient.getTransactionData("32xndDk795Vz2LLP2sjaHz9b6YGeZQxD9c7bAoQcnPS8ASHgLLn6AAttPMqyf8EmnYPaCQvnU3CLdL6WKbqXag5W");
    console.log("Tx data : ", data);
    const fees = await solClient.getFees();
    console.log("Fees : ", fees.fast);
    const txs = await solClient.getTransactionsHistory({address: "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"});
    console.log("Txs : ", txs);
    const hash = await solClient.transfer({amount: 0.0001, recipient: 'G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n'});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkSolana();
})();