import { Network } from "../../src/core/client";
import DojimaChain from "../../src/core/dojima/client";

const dojSwapAmount = 5;
const ethAddress = "0xE3706442481Dc7D8Ca4A1a3e0D48C8a6fe5E75FB";
// const arAddress = "";
// const solAddress = "";

async function dojimaSwap() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Dojima client */
  const dojClient = new DojimaChain({
    phrase,
    network: Network.Testnet,
    rpcUrl: "https://rpc-test-d11k.dojima.network/",
    // rpcUrl: "http://127.0.0.1:8545",
  });
  const dojAddress = dojClient.getAddress();
  console.log("DOJ address :: ", dojAddress);
  const dojBalance = await dojClient.getBalance(dojAddress);
  console.log("DOJ Balance :: ", dojBalance);

  if (dojBalance > dojSwapAmount) {
    const dojInboundAddress = await dojClient.getDojimaInboundAddress(
      // "https://api-test-h4s.dojima.network/"
      "http://localhost:1317/"
    );
    const ethswapHash = await dojClient.swap(
      dojSwapAmount,
      "ETH.ETH",
      dojInboundAddress,
      ethAddress
    );
    console.log("ETH Swap tx hash : ", ethswapHash);
    // const arswapHash = await dojClient.swap(
    //   dojSwapAmount,
    //   "AR.AR",
    //   dojInboundAddress,
    //   arAddress
    // );
    // console.log("AR Swap tx hash : ", arswapHash);
    // const solswapHash = await dojClient.swap(
    //   dojSwapAmount,
    //   "SOL.SOL",
    //   dojInboundAddress,
    //   solAddress
    // );
    // console.log("SOL Swap tx hash : ", solswapHash);
  } else {
    throw new Error("Insufficient balance for Dojima");
  }
}

(async () => {
  await dojimaSwap();
})();
