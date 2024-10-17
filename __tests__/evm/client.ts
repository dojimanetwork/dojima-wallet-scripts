// import { Network } from "../../src/core/client";
import { EvmChainClient } from "../../src/core/evm_chains/client";
import {  TestJsonConfig } from "./config";

async function evmChain() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  // /** EVM client */
  // const evmClient = new EvmChainClient({
  //   phrase,
  //   network: Network.Testnet,
  //   rpcUrl: "http://geth:8545",
  // });
  // const evmAddress = evmClient.getAddress();
  // console.log("evm address :: ", evmAddress);
  // const evmBalance = await evmClient.getBalance(evmAddress);
  // console.log("evm Balance :: ", evmBalance);

  // TestJsonConfig.map(async (config) => {
  //   /** Testnet EVM client */
  //   const testEvmClient = new EvmChainClient({
  //     phrase,
  //     network: config.network,
  //     rpcUrl: config.rpcUrl,
  //   });
  //   const testEvmAddress = testEvmClient.getAddress();
  //   console.log(`Test evm address :: ${config.tokenName} : `, testEvmAddress);
  //   const testEvmBalance = await testEvmClient.getBalance(testEvmAddress);
  //   console.log(`Test evm Balance :: ${config.tokenName} : `, testEvmBalance);
  // });

  const avaxChain = TestJsonConfig.find((config) => config.tokenSymbol === "AVAX");
  const testEvmClient = new EvmChainClient({
    phrase,
    network: avaxChain.network,
    rpcUrl: avaxChain.rpcUrl,
  });
  const testEvmAddress = testEvmClient.getAddress();
  console.log(`Test evm address :: ${avaxChain.tokenName} : `, testEvmAddress);
  const testEvmBalance = await testEvmClient.getBalance(testEvmAddress);
  console.log(`Test evm Balance :: ${avaxChain.tokenName} : `, testEvmBalance);
  const transferHash = await testEvmClient.transfer({
    amount: 0.01,
    recipient: "0xf7b120aa78a8c136fb675248be14244e385d0c1e"
  });
  console.log("Tx hash : ", transferHash);
}

(async () => {
  await evmChain();
})();
