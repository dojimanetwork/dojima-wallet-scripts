import CryptoCompare from '../../src/assets_stats/cryptoCompare/latest_stats';

async function getData() {
    const inst = new CryptoCompare();
    const list = await inst.getAssetsList();
    console.log(list);
    const data = await inst.getLatestData('WBTC', '9488f2efdc1acc3fa218d51fa7d210b492a7d1810e49fc0077cf7a39023283e6');
    console.log(data);
    // if(data && data.length>0) {
    //     console.log(data[1].ath_date);
    // }
}

(async() => {
    await getData();
})()