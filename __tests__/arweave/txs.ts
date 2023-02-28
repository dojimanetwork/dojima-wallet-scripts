import {ArweaveClient} from "../../src/core/arweave";
import {Network} from "../../src/core/client";

async function checkArweave() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    /** for DojTestnet pass
     config : {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
    }
     */
    const arClient = new ArweaveClient({
        phrase,
        network: Network.DojTestnet,
        config: {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
        }
        // config: {
        //     host: "localhost",
        //     port: "1984",
        //     protocol: "http",
        //     timeout: 100000,
        // }
    });
    const txs = await arClient.getTransactionsHistory({address: "7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4"});
    console.log("Txs : ", txs.txs.outer);
    console.log("Txs : ", txs.txs.inner);
}

(async () => {
    await checkArweave();
})();