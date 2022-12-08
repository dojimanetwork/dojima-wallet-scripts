import {SolanaClient} from "../src/core/solana";
import {Network} from "@d11k-ts/client";
// import * as web3 from "@solana/web3.js";
// import {baseToLamports, lamportsToBase, SOL_DECIMAL} from "../src/core/solana";

async function checkSolana() {
    // const inst = new web3.Connection('http://sol-test.h4s.dojima.network', 'confirmed')
    // const pubKey = new web3.PublicKey('DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS');
    // const amt = baseToLamports(5, SOL_DECIMAL)
    // await inst.requestAirdrop(pubKey, amt)
    // const bal = await inst.getBalance(pubKey)
    // console.log(bal)
    // const { feeCalculator } = await inst.getRecentBlockhash();
    // const sol_gasFee = lamportsToBase(feeCalculator.lamportsPerSignature, SOL_DECIMAL);
    // console.log(sol_gasFee)

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({phrase, network: Network.Stagenet});
    const address = await solClient.getAddress();
    console.log("Address :: ", address);
    const bal = await solClient.getBalance(
        "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"
    );
    console.log("Balance :: ", bal);
    // const data = await solClient.getTransactionData("2cEskW8Xk5GZTajRaKTMySYWMRqtJV3Xe8P6mn8e4Xc634PiFDeChZYrtox1UE1e7gHnKRf7v4KfXPPZW82KJKDT");
    // console.log("Tx data : ", data);
    // const fees = await solClient.getFees();
    // console.log("Fees : ", fees.fast);
    // const txs = await solClient.getTransactionsHistory({address: "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"});
    // console.log("Txs : ", txs);
    // const hash = await solClient.transfer({amount: 0.0001, recipient: 'G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n'});
    // console.log("Tx hash : ", hash);
}

(async () => {
    await checkSolana();
})();