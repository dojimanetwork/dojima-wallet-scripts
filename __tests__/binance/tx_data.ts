import {Network} from "../../src/core/client";
import {BinanceBeaconClient} from "../../src/core/binance";

async function checkBinance() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const bnbClient = new BinanceBeaconClient({
        phrase,
        network: Network.Testnet
    });
    const data = await bnbClient.getTransactionData("F1DD0E719D5238CE2AC55CAFAA11126D4563DF3622FB2DC6B4E7E784A25B5238");
    console.log("Tx data : ", data);
}

(async () => {
    await checkBinance();
})();