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
    const fees = await polkaClient.getFees({recipient: '1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7', amount: 0.01});
    console.log("Fees : ", fees);
    process.exit()
}

(async () => {
    await checkPolka();
})();