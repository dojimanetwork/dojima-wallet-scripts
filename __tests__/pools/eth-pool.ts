import { Network } from "../../src/core/client";
import EthereumChain from "../../src/core/eth_dojima/client";
import { DOJ_DECIMAL, HermesSdkClient } from "../../src/core/hermes";
import {
  assetAmount,
  AssetDOJNative,
  assetToBase,
  baseToAsset,
} from "../../src/core/utils";

const ethAddPoolAmount = 10;
const hermesAddPoolAmount = 1000;

async function addEthereumPool() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Ethereum client */
  const ethClient = new EthereumChain({
    phrase,
    network: Network.Testnet,
    rpcUrl: 'http://localhost:9545'
  });
  const ethAddress = ethClient.getAddress();
  console.log("ETH address :: ", ethAddress);
  const ethBalance = await ethClient.getBalance(ethAddress);
  console.log("ETH Balance :: ", ethBalance);

  /** Hermes client */
  const hermesClient = new HermesSdkClient({
    phrase,
    network: Network.Testnet,
    // apiUrl: "https://api-test-h4s.dojima.network",
    // rpcUrl: "https://rpc-test-h4s.dojima.network",
    apiUrl: 'http://localhost:1317',
    rpcUrl: 'http://localhost:26657',
  });
  const hermesAddress = hermesClient.getAddress();
  console.log("H4S address :: ", hermesAddress);
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);

  if (ethBalance > ethAddPoolAmount && h4sBalance > hermesAddPoolAmount) {
    const ethInboundAddress = await ethClient.getEthereumInboundAddress(
      // "https://api-test-h4s.dojima.network/"
      "http://localhost:1317"
    );
    const ethLiquidityPoolHash = await ethClient.addLiquidityPool(
      ethAddPoolAmount,
      ethInboundAddress,
      `${hermesAddress}` // hermes address
    );
    console.log("ETH Liquidity pool tx hash : ", ethLiquidityPoolHash);

    let h4sAmount = assetToBase(assetAmount(hermesAddPoolAmount, DOJ_DECIMAL));
    const h4sLiquidityPoolHash = await hermesClient.deposit({
      amount: h4sAmount,
      memo: `ADD:ETH.ETH:${ethAddress}`,
    });
    console.log("H4S Liquidity pool tx hash :: ", h4sLiquidityPoolHash);
  } else {
    throw new Error("Insufficient balance for Ethereum or Hermes");
  }
}

(async () => {
  await addEthereumPool();
})();
