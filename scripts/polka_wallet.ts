import {PolkadotClient} from '../src/core/polkadot'
// import {cryptoWaitReady} from "@polkadot/util-crypto";

async function checkPolka() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    "blade night lawn zone clown cannon wheat day found head enable fury"
    // await cryptoWaitReady();
    const polkaClient = new PolkadotClient(phrase);
    const address = await polkaClient.getAddress();
    console.log("Address :: ", address);
    const bal = await polkaClient.getBalance(
        "5FKpdt1vdgQ2CNeNQXN9evodm4wBH6655R1GyV44tBdNgXP6"
    );
    console.log("Balance :: ", bal);
    // const data = await thorClient.getTxData("A9F5A06C5817D771A4C5B222D992D493DA13911A9C4F654EC685A5044A480249");
    // console.log("Tx data : ", data);
    // const fees = await polkaClient.getFees('5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH',0.01);
    // console.log("Fees : ", fees);
    // const txs = await polkaClient.getTxsHistory();
    // console.log("Txs : ", txs);
    // const hash = await polkaClient.transfer('5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH',0.01);
    // console.log("Tx hash : ", hash);
    // const batchTxHash = await polkaClient.hermesTransaction('5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH',0.01, 'sample');
    // console.log("Batch Tx hash : ", batchTxHash);
    process.exit()
}

(async () => {
    await checkPolka();
})();