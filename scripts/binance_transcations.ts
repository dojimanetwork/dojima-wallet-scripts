import BinanceTransaction from "../src/transactions/binancechain";

async function getBinance(){
    const binanceInstance = new BinanceTransaction("soething","mainnet")
    const txHistory = await binanceInstance.getBinanceChainTransactionHistory({fromAddress:"bnb13grsgzad3m32kztjnz9usk78y0a9msg05c4u5h"})
    console.log('Txs :: ',txHistory);  
}
(async() => {
    await getBinance();
  })()