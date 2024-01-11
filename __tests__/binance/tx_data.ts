// import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        // network: Network.Testnet,
        // dojClientUrl: 'https://bnb-test.h4s.dojima.network'
    });
    const data = await bnbClient.getTransactionData("BFE10A2058D059C796AE2161997DF04D6FA4CF1A946788A8CA4BAAA6BC15A48E");
    console.log("Tx data : ", data);
}

(async () => {
    await checkBinance();
})();