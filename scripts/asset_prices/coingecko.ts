import CoinGecko from "../../src/assets_stats/coinGecko/assets_data";

async function getData() {
    const inst = new CoinGecko();
    const data = await inst.getAssestsCurrentMarketData();
    // if(data && data.length>0) {
    //     console.log(data[1].ath_date);
    // }
    const history = await inst.getAssetHistoryPriceByDate('bitcoin', '12-04-2022');
    console.log(history);
    return history;
}

(async() => {
    await getData();
})()