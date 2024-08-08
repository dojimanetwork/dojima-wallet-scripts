import { Network } from "../../src/core/client";
import EthereumChain from "../../src/core/eth_dojima/client";

const ethSwapAmount = 10;
const dojAddress = "0xE3706442481Dc7D8Ca4A1a3e0D48C8a6fe5E75FB";
// const arAddress = "";
// const solAddress = "";

async function ethereumSwap() {
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

  if (ethBalance > ethSwapAmount) {
    const ethInboundAddress = await ethClient.getEthereumInboundAddress(
      // "https://api-test-h4s.dojima.network/"
      "http://localhost:1317"
    );
    const dojswapHash = await ethClient.swap(
      ethSwapAmount,
      "DOJ.DOJ",
      ethInboundAddress,
      dojAddress
    );
    console.log("DOJ Swap tx hash : ", dojswapHash);
    // const arswapHash = await ethClient.swap(
    //   ethSwapAmount,
    //   "AR.AR",
    //   ethInboundAddress,
    //   arAddress
    // );
    // console.log("AR Swap tx hash : ", arswapHash);
    // const solswapHash = await ethClient.swap(
    //   ethSwapAmount,
    //   "SOL.SOL",
    //   ethInboundAddress,
    //   solAddress
    // );
    // console.log("SOL Swap tx hash : ", solswapHash);
  } else {
    throw new Error("Insufficient balance for Ethereum");
  }
}

(async () => {
  await ethereumSwap();
})();
