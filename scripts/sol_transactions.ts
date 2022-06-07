import SolanaTransaction from '../src/transactions/solana';

async function getSol() {
    const solInstance = new SolanaTransaction('devnet');
    // const address = await solInstance.getAddress();
    // console.log(address);
    const txHistory = await solInstance.getTransactionsHistory({address: 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS'});
    console.log(txHistory);
    const txDataDetailed = await solInstance.getDetailTransactionData(
      "xMteBvxZhnbBuZ8HtprjAA7PtetyDq2EU9Ebn5Y5Sdf2tTxF1etuouoGqWm8hwQryEXHDZSgehW7umTUUG7kMBy"
    );
    console.log(txDataDetailed);
    const txData = await solInstance.getTransactionData(
      "xMteBvxZhnbBuZ8HtprjAA7PtetyDq2EU9Ebn5Y5Sdf2tTxF1etuouoGqWm8hwQryEXHDZSgehW7umTUUG7kMBy", 
      'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS'
    );
    console.log(txData);
}

(async() => {
  await getSol();
})()