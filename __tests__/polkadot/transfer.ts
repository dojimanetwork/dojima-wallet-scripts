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
    const hash = await polkaClient.transfer({recipient: '5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6', amount: 0.01});
    console.log("Tx hash : ", hash);
    process.exit()
}

(async () => {
    await checkPolka();
})();