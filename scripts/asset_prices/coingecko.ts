import CoinGecko from "../../src/assets_stats/coinGecko/assets_data";

async function getData() {
    const inst = new CoinGecko();
    const data = await inst.getAssestsCurrentMarketData();
    // if(data && data.length>0) {
    //     console.log(data[1].ath_date);
    // }
    return data;
}

(async() => {
    await getData();
})()