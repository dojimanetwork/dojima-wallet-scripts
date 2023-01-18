import {
    DOJ_DECIMAL,
    HermesSdkClient} from "../src/core/hermes";
import {Network} from "@d11k-ts/client";
import {AssetDOJNative,
    baseToAsset
} from "@d11k-ts/utils";
import {assetAmount, assetToBase} from "@d11k-ts/utils";

// 1Ar - 20.17 thor
// 1 Dot - 12.27 thor
// 1Ar - 1.64 dot
async function checkHermes() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        // "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km
// 24828399.7801
    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const address = hermesClient.getAddress();
    console.log("Address :: ", address);
    const bal = await hermesClient.getBalance(
        'dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58',
        // 'dojima1jdkd8n8h3s8mc4vctzvmxwndtcumejvrn00xln',
        // "dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km",    // 24999992.1611
        [AssetDOJNative]
    );
    // console.log(bal)
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await hermesClient.getTransactionData("E6739CCD9DB13B90E651833BD9533D2A1C8109E789767586E2A01E8FFA20392B", 'dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje');
    console.log("Tx data : ", data);
    // const data = await hermesClient.getDepositTransaction("E6739CCD9DB13B90E651833BD9533D2A1C8109E789767586E2A01E8FFA20392B");
    // console.log("Deposit Tx data : ", data);
    const fees = await hermesClient.getFees();
    console.log("Fees : ", fees.fastest.amount().toNumber());
    const txs = await hermesClient.getTransactions({address: "dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58"});
    console.log("Txs : ", txs);
    let amount = assetToBase(assetAmount(0.1, DOJ_DECIMAL ))
    const hash = await hermesClient.transfer({amount, recipient: 'dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58'});
    console.log("Tx hash : ", hash);
    const ardepositHash = await hermesClient.deposit({amount, memo: `ADD:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`})
    console.log('AR Deposit tx hash :: ', ardepositHash)
    const dotdepositHash = await hermesClient.deposit({amount, memo: `ADD:DOT.DOT:5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH`})
    console.log('DOT Deposit tx hash :: ', dotdepositHash)
    const arSwapHash = await hermesClient.deposit({amount, memo: `SWAP:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`})
    console.log('AR Swap tx hash :: ', arSwapHash)
    const dotSwapHash = await hermesClient.deposit({amount, memo: `SWAP:DOT.DOT:5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH`})
    console.log('DOT Swap tx hash :: ', dotSwapHash)
}

(async () => {
    await checkHermes();
})();