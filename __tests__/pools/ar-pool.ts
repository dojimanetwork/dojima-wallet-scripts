import { ArweaveClient } from "../../src/core/arweave";
import { Network } from "../../src/core/client";
import { DOJ_DECIMAL, HermesSdkClient } from "../../src/core/hermes";
import {
  assetAmount,
  AssetDOJNative,
  assetToBase,
  baseToAsset,
} from "../../src/core/utils";

const arAddPoolAmount = 10;
const hermesAddPoolAmount = 10;

async function addArweavePool() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Arweave client */
  const arClient = new ArweaveClient({
    phrase,
    network: Network.Testnet,
    // config: {
    //     host: "ar-dev.h4s.dojima.network",
    //     protocol: "https",
    //     timeout: 100000,
    // }
    config: {
      host: "localhost",
      port: "1984",
      protocol: "http",
      timeout: 100000,
    },
  });
  const arAddress = await arClient.getAddress();
  console.log("AR address :: ", arAddress);
  const arBalance = await arClient.getBalance(arAddress);
  console.log("AR Balance :: ", arBalance);

  /** Hermes client */
  const hermesClient = new HermesSdkClient({
    phrase,
    network: Network.Testnet,
    // apiUrl: "https://api-dev.h4s.dojima.network",
    // rpcUrl: "https://rpc-dev.h4s.dojima.network",
    apiUrl: "http://localhost:1317",
    rpcUrl: "http://localhost:26657",
  });
  const hermesAddress = hermesClient.getAddress();
  console.log("H4S address :: ", hermesAddress);
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);

  if (arBalance > arAddPoolAmount && h4sBalance > hermesAddPoolAmount) {
    const arInboundAddress = await arClient.getArweaveInboundAddress(
      //   "https://api-dev.h4s.dojima.network/"
      "http://localhost:1317"
    );
    const arLiquidityPoolHash = await arClient.addLiquidityPool(
      arAddPoolAmount,
      arInboundAddress,
      `${hermesAddress}` // hermes address
    );
    console.log("Ar Liquidity pool tx hash : ", arLiquidityPoolHash);

    let h4sAmount = assetToBase(assetAmount(hermesAddPoolAmount, DOJ_DECIMAL));
    const h4sLiquidityPoolHash = await hermesClient.deposit({
      amount: h4sAmount,
      memo: `ADD:AR.AR:${arAddress}`,
    });
    console.log("H4S Liquidity pool tx hash :: ", h4sLiquidityPoolHash);
  } else {
    throw new Error("Insufficient balance for Arweave or Hermes");
  }
}

(async () => {
  await addArweavePool();
})();
