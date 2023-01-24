import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "@d11k-ts/client";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.Testnet,
        provider: 'wss://dotws-test.h4s.dojima.network:9944'
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