import { Network } from "../../src/core/client";
import { DOJ_DECIMAL, HermesSdkClient } from "../../src/core/hermes";
import { SolanaClient } from "../../src/core/solana";
import {
  assetAmount,
  AssetDOJNative,
  assetToBase,
  baseToAsset,
} from "../../src/core/utils";

const solAddPoolAmount = 10;
const hermesAddPoolAmount = 10;

async function addSolanaPool() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Solana client */
  const solClient = new SolanaClient({
    phrase,
    network: Network.Testnet,
    // endpoint: "https://sol-dev.h4s.dojima.network",
    endpoint: 'http://127.0.0.1:8899'
  });
  const solAddress = await solClient.getAddress();
  console.log("SOL address :: ", solAddress);
  const solBalance = await solClient.getBalance(solAddress);
  console.log("SOL Balance :: ", solBalance);

  /** Hermes client */
  const hermesClient = new HermesSdkClient({
    phrase,
    network: Network.Testnet,
    // apiUrl: "https://api-dev.h4s.dojima.network",
    // rpcUrl: "https://rpc-dev.h4s.dojima.network",
    apiUrl: 'http://localhost:1317',
    rpcUrl: 'http://localhost:26657',
  });
  const hermesAddress = hermesClient.getAddress();
  console.log("H4S address :: ", hermesAddress);
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);

  if (solBalance > solAddPoolAmount && h4sBalance > hermesAddPoolAmount) {
    const solInboundAddress = await solClient.getSolanaInboundAddress(
      // "https://api-dev.h4s.dojima.network/"
      "http://localhost:1317"
    );
    const solLiquidityPoolHash = await solClient.addLiquidityPool(
      solAddPoolAmount,
      solInboundAddress,
      `${hermesAddress}` // hermes address
    );
    console.log("SOL Liquidity pool tx hash : ", solLiquidityPoolHash);

    let h4sAmount = assetToBase(assetAmount(hermesAddPoolAmount, DOJ_DECIMAL));
    const h4sLiquidityPoolHash = await hermesClient.deposit({
      amount: h4sAmount,
      memo: `ADD:SOL.SOL:${solAddress}`,
    });
    console.log("H4S Liquidity pool tx hash :: ", h4sLiquidityPoolHash);
  } else {
    throw new Error("Insufficient balance for Solana or Hermes");
  }
}

(async () => {
  await addSolanaPool();
})();
