import { createPublicClient, http } from 'viem';
import { 
    generatePrivateKey, 
    privateKeyToAccount 
} from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import {
  prepareChainConfig,
  createRollupPrepareDeploymentParamsConfig,
  createRollup,
} from '@arbitrum/orbit-sdk';
import { sanitizePrivateKey, generateChainId } from '@arbitrum/orbit-sdk/utils';
// import { config } from 'dotenv';
// config();

const DEPLOYER_PRIVATE_KEY= "0xae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0";

/**
 * New key :  0x05f058336dc646db46753f215be3e60b98036f8fb2fa3dc840070ac583e066ca
 * New phrase :  random decide simple divide kitten month enhance expire excess embody ensure lemon
 * New pub :  0x73D37d800Ef11078d701eC33eBEECcdE88879cB3
 */
const BATCH_POSTER_PRIVATE_KEY= "0x05f058336dc646db46753f215be3e60b98036f8fb2fa3dc840070ac583e066ca";
const VALIDATOR_PRIVATE_KEY= "0xae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0";

const PARENT_CHAIN_RPC="https://arb-sepolia.g.alchemy.com/v2/CbEgF9mkaj-KcWnXt4cUlWIBGe8FKEan"

function withFallbackPrivateKey(privateKey: string | undefined): `0x${string}` {
  if (typeof privateKey === 'undefined' || privateKey === '') {
    return generatePrivateKey();
  }

  return sanitizePrivateKey(privateKey);
}

if (typeof DEPLOYER_PRIVATE_KEY === 'undefined') {
  throw new Error(`Please provide the "DEPLOYER_PRIVATE_KEY" environment variable`);
}

if (typeof PARENT_CHAIN_RPC === 'undefined' || PARENT_CHAIN_RPC.length === 0) {
  console.warn(
    `Warning: you may encounter timeout errors while running the script with the default rpc endpoint. Please provide the "PARENT_CHAIN_RPC" environment variable instead.`,
  );
}

// load or generate a random batch poster account
const batchPosterPrivateKey = withFallbackPrivateKey(BATCH_POSTER_PRIVATE_KEY);
const batchPoster = privateKeyToAccount(batchPosterPrivateKey).address;

// load or generate a random validator account
const validatorPrivateKey = withFallbackPrivateKey(VALIDATOR_PRIVATE_KEY);
const validator = privateKeyToAccount(validatorPrivateKey).address;

// set the parent chain and create a public client for it
const parentChain = arbitrumSepolia;
const parentChainPublicClient = createPublicClient({
  chain: parentChain,
  transport: http(PARENT_CHAIN_RPC),
});
console.log("Rollup parent chain client : ", parentChainPublicClient);

// load the deployer account
const deployer = privateKeyToAccount(sanitizePrivateKey(DEPLOYER_PRIVATE_KEY));
console.log("Rollup deployer : ", deployer);

async function main() {
  // generate a random chain id
  const chainId = generateChainId();
  console.log("Rollup chainId : ", chainId);
  // @ts-ignore
  const createRollupConfig = createRollupPrepareDeploymentParamsConfig(parentChainPublicClient, {
    chainId: BigInt(chainId),
    owner: deployer.address,
    chainConfig: prepareChainConfig({
      chainId,
      arbitrum: {
        InitialChainOwner: deployer.address,
        DataAvailabilityCommittee: true,
      },
    }),
  });

  console.log("Rollup config : ", createRollupConfig);

  try {
    await createRollup({
      params: {
        config: createRollupConfig,
        batchPosters: [batchPoster],
        validators: [validator],
      },
      account: deployer,
      parentChainPublicClient,
    });
  } catch (error) {
    console.error(`Rollup creation failed with error: ${error}`);
  }
}

main();


/**
 * Rollup parent chain client :  {
  account: undefined,
  batch: undefined,
  cacheTime: 4000,
  chain: {
    id: 421614,
    name: 'Arbitrum Sepolia',
    network: 'arbitrum-sepolia',
    nativeCurrency: { name: 'Arbitrum Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { alchemy: [Object], default: [Object], public: [Object] },
    blockExplorers: { etherscan: [Object], default: [Object] },
    contracts: { multicall3: [Object] },
    testnet: true,
    fees: undefined,
    formatters: undefined,
    serializers: undefined
  },
  key: 'public',
  name: 'Public Client',
  pollingInterval: 4000,
  request: [AsyncFunction (anonymous)],
  transport: {
    key: 'http',
    name: 'HTTP JSON-RPC',
    request: [AsyncFunction: request],
    retryCount: 3,
    retryDelay: 150,
    timeout: 10000,
    type: 'http',
    fetchOptions: undefined,
    url: 'https://arb-sepolia.g.alchemy.com/v2/CbEgF9mkaj-KcWnXt4cUlWIBGe8FKEan'
  },
  type: 'publicClient',
  uid: '5a8de54d1f5',
  extend: [Function (anonymous)],
  call: [Function: call],
  createBlockFilter: [Function: createBlockFilter],
  createContractEventFilter: [Function: createContractEventFilter],
  createEventFilter: [Function: createEventFilter],
  createPendingTransactionFilter: [Function: createPendingTransactionFilter],
  estimateContractGas: [Function: estimateContractGas],
  estimateGas: [Function: estimateGas],
  getBalance: [Function: getBalance],
  getBlock: [Function: getBlock],
  getBlockNumber: [Function: getBlockNumber],
  getBlockTransactionCount: [Function: getBlockTransactionCount],
  getBytecode: [Function: getBytecode],
  getChainId: [Function: getChainId],
  getContractEvents: [Function: getContractEvents],
  getEnsAddress: [Function: getEnsAddress],
  getEnsAvatar: [Function: getEnsAvatar],
  getEnsName: [Function: getEnsName],
  getEnsResolver: [Function: getEnsResolver],
  getEnsText: [Function: getEnsText],
  getFeeHistory: [Function: getFeeHistory],
  estimateFeesPerGas: [Function: estimateFeesPerGas],
  getFilterChanges: [Function: getFilterChanges],
  getFilterLogs: [Function: getFilterLogs],
  getGasPrice: [Function: getGasPrice],
  getLogs: [Function: getLogs],
  getProof: [Function: getProof],
  estimateMaxPriorityFeePerGas: [Function: estimateMaxPriorityFeePerGas],
  getStorageAt: [Function: getStorageAt],
  getTransaction: [Function: getTransaction],
  getTransactionConfirmations: [Function: getTransactionConfirmations],
  getTransactionCount: [Function: getTransactionCount],
  getTransactionReceipt: [Function: getTransactionReceipt],
  multicall: [Function: multicall],
  prepareTransactionRequest: [Function: prepareTransactionRequest],
  readContract: [Function: readContract],
  sendRawTransaction: [Function: sendRawTransaction],
  simulateContract: [Function: simulateContract],
  verifyMessage: [Function: verifyMessage],
  verifyTypedData: [Function: verifyTypedData],
  uninstallFilter: [Function: uninstallFilter],
  waitForTransactionReceipt: [Function: waitForTransactionReceipt],
  watchBlocks: [Function: watchBlocks],
  watchBlockNumber: [Function: watchBlockNumber],
  watchContractEvent: [Function: watchContractEvent],
  watchEvent: [Function: watchEvent],
  watchPendingTransactions: [Function: watchPendingTransactions]
}
Rollup deployer :  {
  address: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4',
  signMessage: [AsyncFunction: signMessage],
  signTransaction: [AsyncFunction: signTransaction],
  signTypedData: [AsyncFunction: signTypedData],
  source: 'privateKey',
  type: 'local',
  publicKey: '0x04bdf6d6ff2305a9f3765bd01705ed92b6d0ef9db6dc0a8c99a13442b01d014647cbac5e9e4407544b1403d4c88ccf823e07fba9630828fd02a01e636fe0ed7010'
}
Rollup chainId :  38029830404
Rollup config :  {
  extraChallengeTimeBlocks: 0n,
  stakeToken: '0x0000000000000000000000000000000000000000',
  baseStake: 100000000000000000n,
  wasmModuleRoot: '0x260f5fa5c3176a856893642e149cf128b5a8de9f828afec8d11184415dd8dc69',
  loserStakeEscrow: '0x0000000000000000000000000000000000000000',
  genesisBlockNum: 0n,
  confirmPeriodBlocks: 150n,
  sequencerInboxMaxTimeVariation: {
    delayBlocks: 28800n,
    futureBlocks: 300n,
    delaySeconds: 345600n,
    futureSeconds: 3600n
  },
  chainId: 38029830404n,
  owner: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4',
  chainConfig: '{"homesteadBlock":0,"daoForkBlock":null,"daoForkSupport":true,"eip150Block":0,"eip150Hash":"0x0000000000000000000000000000000000000000000000000000000000000000","eip155Block":0,"eip158Block":0,"byzantiumBlock":0,"constantinopleBlock":0,"petersburgBlock":0,"istanbulBlock":0,"muirGlacierBlock":0,"berlinBlock":0,"londonBlock":0,"clique":{"period":0,"epoch":0},"arbitrum":{"EnableArbOS":true,"AllowDebugPrecompiles":false,"DataAvailabilityCommittee":true,"InitialArbOSVersion":20,"GenesisBlockNum":0,"MaxCodeSize":24576,"MaxInitCodeSize":49152,"InitialChainOwner":"0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4"},"chainId":38029830404}'
}
✨  Done in 1.96s.
 *  Terminal will be reused by tasks, press any key to close it. 

 *  Executing task: yarn run arbitrum_rollup_test 

yarn run v1.22.19
warning ../../../package.json: No license field
$ ts-node src/rollup/arbitrum/index.ts
Rollup parent chain client :  {
  account: undefined,
  batch: undefined,
  cacheTime: 4000,
  chain: {
    id: 421614,
    name: 'Arbitrum Sepolia',
    network: 'arbitrum-sepolia',
    nativeCurrency: { name: 'Arbitrum Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { alchemy: [Object], default: [Object], public: [Object] },
    blockExplorers: { etherscan: [Object], default: [Object] },
    contracts: { multicall3: [Object] },
    testnet: true,
    fees: undefined,
    formatters: undefined,
    serializers: undefined
  },
  key: 'public',
  name: 'Public Client',
  pollingInterval: 4000,
  request: [AsyncFunction (anonymous)],
  transport: {
    key: 'http',
    name: 'HTTP JSON-RPC',
    request: [AsyncFunction: request],
    retryCount: 3,
    retryDelay: 150,
    timeout: 10000,
    type: 'http',
    fetchOptions: undefined,
    url: 'https://arb-sepolia.g.alchemy.com/v2/CbEgF9mkaj-KcWnXt4cUlWIBGe8FKEan'
  },
  type: 'publicClient',
  uid: '319a40bc5cc',
  extend: [Function (anonymous)],
  call: [Function: call],
  createBlockFilter: [Function: createBlockFilter],
  createContractEventFilter: [Function: createContractEventFilter],
  createEventFilter: [Function: createEventFilter],
  createPendingTransactionFilter: [Function: createPendingTransactionFilter],
  estimateContractGas: [Function: estimateContractGas],
  estimateGas: [Function: estimateGas],
  getBalance: [Function: getBalance],
  getBlock: [Function: getBlock],
  getBlockNumber: [Function: getBlockNumber],
  getBlockTransactionCount: [Function: getBlockTransactionCount],
  getBytecode: [Function: getBytecode],
  getChainId: [Function: getChainId],
  getContractEvents: [Function: getContractEvents],
  getEnsAddress: [Function: getEnsAddress],
  getEnsAvatar: [Function: getEnsAvatar],
  getEnsName: [Function: getEnsName],
  getEnsResolver: [Function: getEnsResolver],
  getEnsText: [Function: getEnsText],
  getFeeHistory: [Function: getFeeHistory],
  estimateFeesPerGas: [Function: estimateFeesPerGas],
  getFilterChanges: [Function: getFilterChanges],
  getFilterLogs: [Function: getFilterLogs],
  getGasPrice: [Function: getGasPrice],
  getLogs: [Function: getLogs],
  getProof: [Function: getProof],
  estimateMaxPriorityFeePerGas: [Function: estimateMaxPriorityFeePerGas],
  getStorageAt: [Function: getStorageAt],
  getTransaction: [Function: getTransaction],
  getTransactionConfirmations: [Function: getTransactionConfirmations],
  getTransactionCount: [Function: getTransactionCount],
  getTransactionReceipt: [Function: getTransactionReceipt],
  multicall: [Function: multicall],
  prepareTransactionRequest: [Function: prepareTransactionRequest],
  readContract: [Function: readContract],
  sendRawTransaction: [Function: sendRawTransaction],
  simulateContract: [Function: simulateContract],
  verifyMessage: [Function: verifyMessage],
  verifyTypedData: [Function: verifyTypedData],
  uninstallFilter: [Function: uninstallFilter],
  waitForTransactionReceipt: [Function: waitForTransactionReceipt],
  watchBlocks: [Function: watchBlocks],
  watchBlockNumber: [Function: watchBlockNumber],
  watchContractEvent: [Function: watchContractEvent],
  watchEvent: [Function: watchEvent],
  watchPendingTransactions: [Function: watchPendingTransactions]
}
Rollup deployer :  {
  address: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4',
  signMessage: [AsyncFunction: signMessage],
  signTransaction: [AsyncFunction: signTransaction],
  signTypedData: [AsyncFunction: signTypedData],
  source: 'privateKey',
  type: 'local',
  publicKey: '0x04bdf6d6ff2305a9f3765bd01705ed92b6d0ef9db6dc0a8c99a13442b01d014647cbac5e9e4407544b1403d4c88ccf823e07fba9630828fd02a01e636fe0ed7010'
}
Rollup chainId :  66789407623
Rollup config :  {
  extraChallengeTimeBlocks: 0n,
  stakeToken: '0x0000000000000000000000000000000000000000',
  baseStake: 100000000000000000n,
  wasmModuleRoot: '0x260f5fa5c3176a856893642e149cf128b5a8de9f828afec8d11184415dd8dc69',
  loserStakeEscrow: '0x0000000000000000000000000000000000000000',
  genesisBlockNum: 0n,
  confirmPeriodBlocks: 150n,
  sequencerInboxMaxTimeVariation: {
    delayBlocks: 28800n,
    futureBlocks: 300n,
    delaySeconds: 345600n,
    futureSeconds: 3600n
  },
  chainId: 66789407623n,
  owner: '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4',
  chainConfig: '{"homesteadBlock":0,"daoForkBlock":null,"daoForkSupport":true,"eip150Block":0,"eip150Hash":"0x0000000000000000000000000000000000000000000000000000000000000000","eip155Block":0,"eip158Block":0,"byzantiumBlock":0,"constantinopleBlock":0,"petersburgBlock":0,"istanbulBlock":0,"muirGlacierBlock":0,"berlinBlock":0,"londonBlock":0,"clique":{"period":0,"epoch":0},"arbitrum":{"EnableArbOS":true,"AllowDebugPrecompiles":false,"DataAvailabilityCommittee":true,"InitialArbOSVersion":20,"GenesisBlockNum":0,"MaxCodeSize":24576,"MaxInitCodeSize":49152,"InitialChainOwner":"0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4"},"chainId":66789407623}'
}
Deploying the Rollup...
Deployed in https://sepolia.arbiscan.io/tx/0xf15804adc2982ce2f9592bd4e8092435dfd9e7d4431045b5d15cda61472092fa
Deployment transaction hash is 0xf15804adc2982ce2f9592bd4e8092435dfd9e7d4431045b5d15cda61472092fa
 * 
 */