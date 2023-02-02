import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "../../src/core/client";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.DojTestnet,
        provider: 'wss://dotws-test.h4s.dojima.network:9944'
    });
    const hash = await polkaClient.transfer({recipient: '5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6', amount: 2});
    console.log("Tx hash : ", hash);
    process.exit()
}

(async () => {
    await checkPolka();
})();