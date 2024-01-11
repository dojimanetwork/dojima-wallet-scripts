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
    const txs = await bnbClient.getTransactions({address: "bnb10af52w77pkehgxhnwgeca50q2t2354q4xamz5y"});
    console.log("Txs : ", txs);
}

(async () => {
    await checkBinance();
})();