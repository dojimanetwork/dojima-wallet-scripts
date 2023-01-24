import {ArweaveClient} from "../../src/core/arweave";
import {Network} from "@d11k-ts/client";

async function checkArweave() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    /** for testnet pass
     config : {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
    }
     */
    const arClient = new ArweaveClient({
        phrase,
        network: Network.Testnet,
        config: {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
        }
    });
    const data = await arClient.getTransactionData("xnwCmS_oyt6u_yYjCD0kPOC8zMHp16wHF0vcY7ORMPg");
    console.log("Tx data : ", data);
}

(async () => {
    await checkArweave();
})();