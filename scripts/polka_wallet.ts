import {PolkadotClient} from '../src/core/polkadot'
import {Network} from "@d11k-ts/client";

// import {cryptoWaitReady} from "@polkadot/util-crypto";

async function checkPolka() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    "blade night lawn zone clown cannon wheat day found head enable fury"
    // await cryptoWaitReady();
    const polkaClient = new PolkadotClient({ phrase, network: Network.Testnet });
    const address = await polkaClient.getAddress();
    console.log("Address :: ", address);
    const bal = await polkaClient.getBalance(
        "5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6"
    );
    console.log("Balance :: ", bal);
    const fees = await polkaClient.getFees({recipient: '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH', amount: 0.01});
    console.log("Fees : ", fees);
    const hash = await polkaClient.transfer({recipient: '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH', amount: 0.01});
    console.log("Tx hash : ", hash);
    const rawTx1 = await polkaClient.buildTx({recipient: '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH', amount: 0.01})
    const rawTx2 = await polkaClient.buildTx({recipient: '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH', amount: 0.001})
    const rawTx3 = await polkaClient.buildTx({recipient: '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH', amount: 0.0001})
    const batchTxHash = await polkaClient.polkaBatchTxsToHermes([rawTx1, rawTx2, rawTx3], 'sample');
    console.log("Batch Tx hash : ", batchTxHash);
    process.exit()
}

(async () => {
    await checkPolka();
})();