import { Network } from "../../core/client";
import { EvmChainClient } from "../../core/evm_chains";
import { assertIsAddress, deployRollup } from "./deployRollup";
import { DeploymentPageStateManager } from "./initialState";
import { ChainType } from "./types";
import { getRandomWallet } from "./utils";
import publicClient from "./publicClient.json";
import walletClient from "./walletClient.json";

async function main() {
  /** User Wallet */
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  /** Testnet EVM client */
  const testEvmClient = new EvmChainClient({
    phrase,
    network: Network.Testnet,
    rpcUrl:
      "https://arb-sepolia.g.alchemy.com/v2/CbEgF9mkaj-KcWnXt4cUlWIBGe8FKEan",
  });
  const testEvmAddress = testEvmClient.getAddress();
  console.log(`Test evm address : `, testEvmAddress);
  const testEvmBalance = await testEvmClient.getBalance(testEvmAddress);
  console.log(`Test evm Balance : `, testEvmBalance);
  /** New rollup instance */
  const rollupInstance = new DeploymentPageStateManager(testEvmAddress);
  console.log("Rollup instance : ", rollupInstance.getState());

  rollupInstance.updateChainType(ChainType.Rollup);

  /** Generate random wallets for validator and batch-proposer */

  const validators = [getRandomWallet()];
  console.log("validator : ", validators);
  rollupInstance.updateValidators(validators);
  const batchProposer = getRandomWallet();
  console.log("batch proposer : ", batchProposer);
  rollupInstance.updateBatchPoster(batchProposer);

  /** Update rollup contracts */

  console.log("public : ", publicClient);
  console.log("Wallet client : ", walletClient);
  assertIsAddress(testEvmAddress);
  const rollupArgs = {
    rollupConfig: rollupInstance.state.rollupConfig,
    validators: rollupInstance.state.validators,
    batchPoster: rollupInstance.state.batchPoster,
    chainType: rollupInstance.state.chainType,
    account: testEvmAddress,
    publicClient,
    walletClient,
  };

  // @ts-ignore
  const rollupContractAndConfigDeployResult = await deployRollup(rollupArgs);
  console.log("Node Config : ", rollupContractAndConfigDeployResult.config.nodeConfig);
  console.log("L3 Config : ", rollupContractAndConfigDeployResult.config.l3Config);
  console.log("Contracts : ", rollupContractAndConfigDeployResult.contracts);
  rollupInstance.updateRollupContracts(rollupContractAndConfigDeployResult.contracts);

  /** Updated rollup instance */
  console.log("Updated Rollup instance : ", rollupInstance.getState());
}

main();
