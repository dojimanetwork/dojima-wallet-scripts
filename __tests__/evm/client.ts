import {EvmChainClient} from "../../src/core/evm_chains/client";
import { JsonConfig, TestJsonConfig } from "./config";

async function evmChain() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
    
  /** EVM client */
  const evmClient = new EvmChainClient({
    phrase,
    network: JsonConfig.network,
    rpcUrl: JsonConfig.rpcUrl,
  });
  const evmAddress = evmClient.getAddress();
  console.log("evm address :: ", evmAddress);
  const evmBalance = await evmClient.getBalance(evmAddress);
  console.log("evm Balance :: ", evmBalance);

  /** Testnet EVM client */
  const testEvmClient = new EvmChainClient({
    phrase,
    network: TestJsonConfig.network,
    rpcUrl: TestJsonConfig.rpcUrl,
  });
  const testEvmAddress = testEvmClient.getAddress();
  console.log("Test evm address :: ", testEvmAddress);
  const testEvmBalance = await testEvmClient.getBalance(testEvmAddress);
  console.log("Test evm Balance :: ", testEvmBalance);
}

(async () => {
  await evmChain();
})();
