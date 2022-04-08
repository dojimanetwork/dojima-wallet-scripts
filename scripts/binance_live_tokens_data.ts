import AssetsData from '../src/assets_stats/assets_data';

async function getData() {
    const BnbInst = new AssetsData('testnet');
    const data = await BnbInst.getLatestPrices();           // Generates all tokens latest values in USDT
    console.log(data);
    const hr24Data = await BnbInst.getLast24HrData();           // Generates all tokens last 24hr values in USDT
    console.log(hr24Data);
}

(async () => {
    getData();
})();