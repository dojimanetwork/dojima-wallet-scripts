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
    const inboundAddress = await arClient.getArweaveInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const liquidityPoolHash = await arClient.addLiquidityPool(
        10,
        inboundAddress,
        'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'      // optional
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
}

(async () => {
    await checkArweave();
})();