import {BitcoinClient} from '../../src/core/bitcoin';
import {Network} from "../../src/core/client";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.DojTestnet});
    const data = await btcClient.getTransactionData("960fc663be2201df93d28ed8a97de24ca28017be8406cd1f22e0962ccd6b0726");
    console.log("Tx data : ", data);
}

(async () => {
    await checkBtc();
})();