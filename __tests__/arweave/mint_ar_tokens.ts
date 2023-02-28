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
    const address = await arClient.getAddress();
    console.log("Address :: ", address);
    await arClient.mintArTokens('7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    const bal = await arClient.getBalance(
        "7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4"
    );
    console.log("Balance :: ", bal);
}

(async () => {
    await checkArweave();
})();