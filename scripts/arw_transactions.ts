import ArweaveTxs from "../src/transactions/arweave";

async function getArw() {
    const inst = new ArweaveTxs('letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn', 'mainnet');
    // console.log(inst);
    const txs = await inst.getTransactionsHistory('03raaUsZwaI73Jbtj8qTBiNZeCkcETC29NAGEDpYRWM');
    console.log(txs);
}
(async() => {
    await getArw();
})()