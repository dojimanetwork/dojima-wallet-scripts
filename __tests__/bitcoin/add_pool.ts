import {BitcoinClient} from '../../src/core/bitcoin';
import {Network} from "../../src/core/client";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.Testnet});
    const address = btcClient.getAddress();
    console.log("Address :: ", address);
}

(async () => {
    await checkBtc();
})();