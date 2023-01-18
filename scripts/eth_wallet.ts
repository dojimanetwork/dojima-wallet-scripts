import {Client} from '../src/core/ethereum';
import {Network} from "@d11k-ts/client";
import {
    assetAmount,
    assetToBase,
    baseToAsset
} from "@d11k-ts/utils";
import {ETH_DECIMAL} from "../src/core/ethereum";

async function checkEth() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const ethClient = new Client({
        phrase,
        network: Network.Testnet,
        // infuraCreds: {projectId: 'f37faaf5ddeb4e589d6f26300ed673a6'},
        etherscanApiKey: '6IU4JG5P2PNVRSB54YIAMIAQFQ879PXJ7C',
        ethplorerApiKey: 'EK-aUaYx-fDc6bNC-WfsGG'
    });
    const address = ethClient.getAddress();
    console.log("Address :: ", address);
    const bal = await ethClient.getBalance(
        "0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4"
    );
    // console.log("Balance :: ", bal);
    const balance = (baseToAsset(bal[0].amount)).amount();
    console.log("Balance :: ", balance.toNumber());
    const data = await ethClient.getTransactionData("0xb11480326f091aa1880868c72c6aae76258f08d48d98f0e6944f137eec7f8180");
    console.log("Tx data : ", data);
    let amountToTransfer = 0.0000001
    let amount = assetToBase(assetAmount(amountToTransfer, ETH_DECIMAL))
    const fees = await ethClient.estimateFeesWithGasPricesAndLimits({ amount, recipient: '0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4' });
    console.log(`
        Fees average : ${baseToAsset(fees.fees.average).amount()},
        gas limits: ${fees.gasLimit},
        gas prices average: ${baseToAsset(fees.gasPrices.average).amount()}
    `)
    const txs = await ethClient.getTransactions({address: "0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4"});
    console.log("Txs : ", txs);
    const hash = await ethClient.transfer({
        amount,
        recipient: '0x0577e1e35c4f30ca8379269b7fd85cbce7f084f4'
    });
    console.log("Tx hash : ", hash);
}

(async () => {
    await checkEth();
})();