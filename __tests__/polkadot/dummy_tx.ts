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
    const inboundAddress = await polkaClient.getPolkadotInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const batchTxHash = await polkaClient.polkaBatchTxsToHermes(2, inboundAddress, 'memo:NOOP:NOVAULT')
    console.log('Batch Tx hash :: ', batchTxHash);
    process.exit()
}

(async () => {
    await checkPolka();
})();