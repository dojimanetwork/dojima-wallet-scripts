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
    const data = await arClient.getTransactionData("v6tFz9oMqPjthlwez1OfOALuOObAJPllUODpJlJ-u6Q");
    console.log("Tx data : ", data);
}

(async () => {
    await checkArweave();
})();