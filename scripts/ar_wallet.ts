import {ArweaveClient} from "../src/core/arweave";
import {Network} from "@d11k-ts/client";

async function checkThor() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    /** for testnet pass
    config : {
            host: "localhost",
            port: "1984",
            protocol: "http",
            timeout: 100000,
    }
     */
    const arClient = new ArweaveClient({ phrase, network: Network.Mainnet});
    const address = await arClient.getAddress();
    console.log("Address :: ", address);
    // await arClient.mintArTokens('7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    const bal = await arClient.getBalance(
        "7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4"
    );
    console.log("Balance :: ", bal);
    const data = await arClient.getTransactionData("cgMjvkxN-EcMw7tUITBP1jPRc3c-v2XJ8Y1ptfAOV7o");
    console.log("Tx data : ", data);
    const rawTx = await arClient.createTransaction('UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', 0.5);
    const fees = arClient.getFees(rawTx);
    console.log("Fees : ", fees.fast);
    const txs = await arClient.getTransactionsHistory({address: "7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4"});
    console.log("Txs : ", txs.txs.outer);
    console.log("Txs : ", txs.txs.inner);
    const hash = await arClient.transfer({ recipient: 'UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', amount: 0.5});
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkThor();
})();