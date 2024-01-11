import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.Testnet,
        dojClientUrl: 'https://bnb-test.h4s.dojima.network'
    });
    const fees = await bnbClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
}

(async () => {
    await checkBinance();
})();