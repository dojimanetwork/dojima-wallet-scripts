import {BitcoinClient} from '../../src/core/bitcoin';
import {Network} from "../../src/core/client";

async function checkBtc() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const btcClient = new BitcoinClient({phrase, network: Network.DojTestnet});
    const fees = await btcClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    console.log("Fees : ", fees.average.amount().toNumber());
    console.log("Fees : ", fees.fast.amount().toNumber());
}

(async () => {
    await checkBtc();
})();