import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";
import {assetAmount, assetToBase} from "@d11k-ts/utils";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.DojTestnet,
        // dojClientUrl: 'https://bnb-test.h4s.dojima.network'
        dojClientUrl: 'http://localhost:26660'
    });
    let amount = assetToBase(assetAmount(1, 8 ))
    const hash = await bnbClient.transfer({
        amount,
        recipient: 'tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va'
    });
    console.log("Tx hash : ", hash);
    // let amount = assetToBase(assetAmount(19.52066681, 8 ))
    // const hash = await bnbClient.transfer({
    //     amount,
    //     recipient: 'tbnb1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pezkgkh4',
    //     memo: 'NOOP:NOVAULT'
    // });
}

(async () => {
    await checkBinance();
})();