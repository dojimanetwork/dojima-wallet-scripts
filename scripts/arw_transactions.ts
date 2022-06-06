import ArweaveTxs from "../src/transactions/arweave";

async function getArw() {
    const inst = new ArweaveTxs('mainnet');
    // console.log(inst);
    const txs = await inst.getTransactionsHistory('03raaUsZwaI73Jbtj8qTBiNZeCkcETC29NAGEDpYRWM');
    console.log(txs);
    const txData = await inst.getTransactionData('jhhFCI-NPLDRSM4BJ8kML52ANn1KOG2AyhFuPaa5zBs');
    console.log(txData);
}
(async() => {
    await getArw();
})()