import AssetLatestPrices from '../src/assets_stats/latest_prices';

async function getData() {
    const BnbInst = new AssetLatestPrices('mainnet');
    const data = await BnbInst.getLatestPrices();           // Generates all tokens values in USDT
    console.log(data);
}

(async () => {
    getData();
})();