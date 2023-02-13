import CoinMarketCap from '../../src/assets_stats/coinMarketCap/client'

async function getData() {
    const CMCInst = new CoinMarketCap()
    const priceData = await CMCInst.convertTokenPrice(1, 'BTC', 'AR')
    console.log(priceData)
    const assetList = await CMCInst.getAssetList()
    console.log(assetList)
}

(async() => {
    await getData();
})()