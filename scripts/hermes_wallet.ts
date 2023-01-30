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
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km
// 24828399.7801
    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const address = hermesClient.getAddress();
    console.log("Address :: ", address);
    const bal = await hermesClient.getBalance(
        // 'dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58',
        // 'dojima1jdkd8n8h3s8mc4vctzvmxwndtcumejvrn00xln',
        "dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km",    // 24995294.33007704 24995264.31007704
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
    let amount = assetToBase(assetAmount(1, DOJ_DECIMAL ))
    const hash = await hermesClient.transfer({amount, recipient: 'dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58'});
    console.log("Tx hash : ", hash);
    let ARamount = assetToBase(assetAmount(60, DOJ_DECIMAL ))
    const ardepositHash = await hermesClient.deposit({amount: ARamount, memo: `ADD:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`})
    console.log('AR Deposit tx hash :: ', ardepositHash)
    let DOTamount = assetToBase(assetAmount(40, DOJ_DECIMAL ))
    const dotdepositHash = await hermesClient.deposit({amount: DOTamount, memo: `ADD:DOT.DOT:5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH`})
    console.log('DOT Deposit tx hash :: ', dotdepositHash)
    let ETHamount = assetToBase(assetAmount(9200, DOJ_DECIMAL ))
    const ethdepositHash = await hermesClient.deposit({amount: ETHamount, memo: `ADD:ETH.ETH:0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4`})
    console.log('ETH Deposit tx hash :: ', ethdepositHash)
    let BNBamount = assetToBase(assetAmount(1800, DOJ_DECIMAL ))
    const bnbdepositHash = await hermesClient.deposit({amount: BNBamount, memo: `ADD:BNB.BNB:tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu`})
    console.log('BNB Deposit tx hash :: ', bnbdepositHash)
    let SOLamount = assetToBase(assetAmount(150, DOJ_DECIMAL ))
    const soldepositHash = await hermesClient.deposit({amount: SOLamount, memo: `ADD:SOL.SOL:DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS`})
    console.log('SOL Deposit tx hash :: ', soldepositHash)
    let ARSwapamount = assetToBase(assetAmount(70, DOJ_DECIMAL ))
    const arSwapHash = await hermesClient.deposit({amount: ARSwapamount, memo: `SWAP:AR.AR:7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4`})
    console.log('AR Swap tx hash :: ', arSwapHash)
    let DOTSwapamount = assetToBase(assetAmount(70, DOJ_DECIMAL ))
    const dotSwapHash = await hermesClient.deposit({amount: DOTSwapamount, memo: `SWAP:DOT.DOT:5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH`})
    console.log('DOT Swap tx hash :: ', dotSwapHash)
}

(async () => {
    await checkHermes();
})();