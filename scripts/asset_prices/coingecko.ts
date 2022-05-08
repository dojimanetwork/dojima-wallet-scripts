import CoinGecko from "../../src/assets_stats/coinGecko/assets_data";

async function getData() {
    const inst = new CoinGecko();
    const data = await inst.getAssestsCurrentMarketData({assets: 'bitcoin'});
    // if(data && data.length>0) {
    //     console.log(data[1].ath_date);
    // }
    const history = await inst.getAssetHistoryPriceByDate('bitcoin', '12-04-2022');
    const dataByDay = await inst.getAssetHistoryPriceByNoOfDays('bitcoin', 2);
    const dataByDateRange = await inst.getAssetHistoryPriceByDateRange('bitcoin', '2022-01-12', '2022-04-15');
    return dataByDateRange;
}

(async() => {
    await getData();
})()