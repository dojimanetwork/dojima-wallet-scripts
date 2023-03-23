import {PolkadotClient} from '../../src/core/polkadot'
import {Network} from "../../src/core/client";
// import {
//     getDoubleSwapFee,
//     getDoubleSwapOutput,
//     getDoubleSwapOutputWithFee
// } from "../../src/core/swap_utils/calc";
// import {assetAmount, assetToBase} from "@d11k-ts/utils";

async function checkPolka() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const polkaClient = new PolkadotClient({
        phrase,
        network: Network.DojTestnet,
        provider: 'wss://dotws-test.h4s.dojima.network:9944'
        // provider: 'ws://localhost:9944'
    });
    const address = await polkaClient.getAddress();
    console.log("Address :: ", address);
    const bal = await polkaClient.getBalance(
        '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH'
    );
    console.log("Balance :: ", bal);
    // const swapFee = getDoubleSwapFee(
    //     10000000,
    //     {
    //         assetBalance: 1000000000,
    //         runeBalance: 200030546019
    //     },
    //     {
    //         assetBalance: 46747534927331,
    //         runeBalance: 39931295469
    //     })
    // console.log(' Swap fee :: ', swapFee)
    // const swapOutput = getDoubleSwapOutput(
    //     10000000,
    //     {
    //         assetBalance: 1000000000,
    //         runeBalance: 200030546019
    //     },
    //     {
    //         assetBalance: 46747534927331,
    //         runeBalance: 39931295469
    //     })
    // console.log('Output : ', swapOutput)
    // const swapOutputWithFee = getDoubleSwapOutputWithFee(
    //     10000000,
    //     {
    //         assetBalance: 1000000000,
    //         runeBalance: 200030546019
    //     },
    //     {
    //         assetBalance: 46747534927331,
    //         runeBalance: 39931295469
    //     },
    //     10000000
    // )
    // console.log('Output with fee : ', swapOutputWithFee)
    // Fee 1 :  19608915.4023135
    // Output 1 :  1960891540.23135
    // Fee 2 :  102423542674.50354
    // Fee 1 asset :  22956141214.310703
    // Swap fee ::  125379683888.81424
    // Output :  2085737360585.8872

    process.exit()
}

(async () => {
    await checkPolka();
})();