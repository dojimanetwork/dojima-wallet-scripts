import { Network } from "../../src/core/client";
import { SolanaClient } from "../../src/core/solana";

const solSwapAmount = 10;
const dojAddress = "";
// const ethAddress = "";
// const arAddress = "";

async function solanaSwap() {
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

  if (solBalance > solSwapAmount) {
    const solInboundAddress = await solClient.getSolanaInboundAddress(
      // "https://api-dev.h4s.dojima.network/"
      "http://localhost:1317"
    );
    const dojswapHash = await solClient.swap(
      solSwapAmount,
      "D11K.DOJ",
      solInboundAddress,
      dojAddress
    );
    console.log("DOJ Swap tx hash : ", dojswapHash);
    // const ethswapHash = await solClient.swap(
    //   solSwapAmount,
    //   "ETH.ETH",
    //   solInboundAddress,
    //   ethAddress
    // );
    // console.log("ETH Swap tx hash : ", ethswapHash);
    // const solswapHash = await solClient.swap(
    //   solSwapAmount,
    //   "AR.AR",
    //   solInboundAddress,
    //   arAddress
    // );
    // console.log("AR Swap tx hash : ", solswapHash);
  } else {
    throw new Error("Insufficient balance for Solana");
  }
}

(async () => {
  await solanaSwap();
})();
