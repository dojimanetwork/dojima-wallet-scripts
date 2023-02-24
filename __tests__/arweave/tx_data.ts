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
        // config: {
        //     host: "ar-test.h4s.dojima.network",
        //     protocol: "https",
        //     timeout: 100000,
        // }
        config: {
            host: "localhost",
            port: "1984",
            protocol: "http",
            timeout: 100000,
        }
    });
    const data = await arClient.getTransactionData("tjCEVEt4GtG2zY5ClJdB76UNCfTufNMjVtOkJY_1hmM");
    console.log("Tx data : ", data);
}

(async () => {
    await checkArweave();
})();