import { Network } from "../../src/core/client";
import DojimaChain from "../../src/core/dojima/client";
import { DOJ_DECIMAL, HermesSdkClient } from "../../src/core/hermes";
import {
  assetAmount,
  AssetDOJNative,
  assetToBase,
  baseToAsset,
} from "../../src/core/utils";

const dojAddPoolAmount = 10;
const hermesAddPoolAmount = 10;

async function addDojimaPool() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Dojima client */
  const dojClient = new DojimaChain({
    phrase,
    // network: Network.Stagenet,
    // rpcUrl: "https://rpc-d11k.dojima.network/",
    // network: Network.Testnet,
    // rpcUrl: "https://rpc-test-d11k.dojima.network/",
    network: Network.Testnet,
    rpcUrl: "http://127.0.0.1:8545",
  });
  const dojAddress = dojClient.getAddress();
  console.log("DOJ address :: ", dojAddress);
  const dojBalance = await dojClient.getBalance(dojAddress);
  console.log("DOJ Balance :: ", dojBalance);

  /** Hermes client */
  const hermesClient = new HermesSdkClient({
    phrase,
    // network: Network.Stagenet,
    // apiUrl: "https://api-h4s.dojima.network",
    // rpcUrl: "https://rpc-h4s.dojima.network",
    // network: Network.Testnet,
    // apiUrl: "https://api-test-h4s.dojima.network",
    // rpcUrl: "https://rpc-test-h4s.dojima.network",
    network: Network.Testnet,
    apiUrl: 'http://localhost:1317',
    rpcUrl: 'http://localhost:26657',
  });
  const hermesAddress = hermesClient.getAddress();
  console.log("H4S address :: ", hermesAddress);
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);

  if (dojBalance > dojAddPoolAmount && h4sBalance > hermesAddPoolAmount) {
    const dojInboundAddress = await dojClient.getDojimaInboundAddress(
      // "https://api-test-h4s.dojima.network/"
      // "https://api-h4s.dojima.network/"
      "http://localhost:1317/"
    );
    const dojLiquidityPoolHash = await dojClient.addLiquidityPool(
      dojInboundAddress,
      dojAddPoolAmount,
      `${hermesAddress}` // hermes address
    );
    console.log("DOJ Liquidity pool tx hash : ", dojLiquidityPoolHash);

    let h4sAmount = assetToBase(assetAmount(hermesAddPoolAmount, DOJ_DECIMAL));
    const h4sLiquidityPoolHash = await hermesClient.deposit({
      amount: h4sAmount,
      memo: `ADD:DOJ.DOJ:${dojAddress}`,
    });
    console.log("H4S Liquidity pool tx hash :: ", h4sLiquidityPoolHash);
  } else {
    throw new Error("Insufficient balance for Dojima or Hermes");
  }
}

(async () => {
  await addDojimaPool();
})();
