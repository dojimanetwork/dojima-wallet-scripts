import {Network} from "../../src/core/client";
import DojimaChain from "../../src/core/dojima/client";

async function checkDoj() {
    // const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    const phrase = 'da047afc0824231a870876cb89321de362e922a23b8e4cf068473347246dd954';
    const dojClient = new DojimaChain({
        phrase,
        network: Network.Testnet,
        // rpcUrl: 'https://api-test.d11k.dojima.network/',
        rpcUrl: "http://127.0.0.1:8545",
        // infuraApiKey: 'f37faaf5ddeb4e589d6f26300ed673a6',
    })
    const inboundAddress = await dojClient.getDojimaInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const liquidityPoolHash = await dojClient.addLiquidityPool(
        100,
        inboundAddress,
        'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'          // optional
    )
    console.log('Liquidity pool hash : ', liquidityPoolHash)
    // const liquidityPoolHash = await ethClient.withdrawLiquidityPool(
    //     1,
    //     inboundAddress,
    //     'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km'          // optional
    // )
    // console.log('Liquidity pool hash : ', liquidityPoolHash)
}

(async () => {
    await checkDoj();
})();