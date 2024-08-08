import { ArweaveClient } from "../../src/core/arweave";
import { Network } from "../../src/core/client";

const arSwapAmount = 10;
const dojAddress = "0xE3706442481Dc7D8Ca4A1a3e0D48C8a6fe5E75FB";
// const ethAddress = "";
// const solAddress = "";

async function arweaveSwap() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Arweave client */
  const arClient = new ArweaveClient({
    phrase,
    network: Network.Testnet,
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

  if (arBalance > arSwapAmount) {
    const arInboundAddress = await arClient.getArweaveInboundAddress(
      // "https://api-test-h4s.dojima.network/"
      "http://localhost:1317"
    );
    const dojswapHash = await arClient.swap(
      arSwapAmount,
      "DOJ.DOJ",
      arInboundAddress,
      dojAddress
    );
    console.log("DOJ Swap tx hash : ", dojswapHash);
    // const ethswapHash = await arClient.swap(
    //   arSwapAmount,
    //   "ETH.ETH",
    //   arInboundAddress,
    //   ethAddress
    // );
    // console.log("ETH Swap tx hash : ", ethswapHash);
    // const solswapHash = await arClient.swap(
    //   arSwapAmount,
    //   "SOL.SOL",
    //   arInboundAddress,
    //   solAddress
    // );
    // console.log("SOL Swap tx hash : ", solswapHash);
  } else {
    throw new Error("Insufficient balance for Arweave");
  }
}

(async () => {
  await arweaveSwap();
})();
