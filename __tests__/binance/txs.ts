import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.Testnet
    });
    const txs = await bnbClient.getTransactions({address: "tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va"});
    console.log("Txs : ", txs);
}

(async () => {
    await checkBinance();
})();