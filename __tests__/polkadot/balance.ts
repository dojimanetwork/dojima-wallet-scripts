import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "../../src/core/client";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.DojTestnet,
        provider: 'wss://dotws-test.h4s.dojima.network:9944'
        // provider: 'ws://localhost:9944'
    });
    const address = await polkaClient.getAddress();
    console.log("Address :: ", address);
    const bal = await polkaClient.getBalance(
        '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH'
    );
    console.log("Balance :: ", bal);
    process.exit()
}

(async () => {
    await checkPolka();
})();