import { Network } from "../../src/core/client";
import { EvmChainJsonConfig } from "./types";

export const JsonConfig: EvmChainJsonConfig = {
  /** 5ire */
  tokenName: "5ireChain Mainnet",
  tokenSymbol: "5ire",
  decimals: 18,
  rpcUrl: "https://rpc.5ire.network",
  chainId: "995",
  network: Network.Stagenet,
  explorerUrl: "https://5irescan.io/",

  /** BSC */
  // tokenName: "BNB Smart Chain Mainnet",
  // tokenSymbol: "BNB",
  // decimals: 18,
  // rpcUrl: "https://bsc-dataseed1.binance.org/",
  // chainId: "56",
  // network: Network.Stagenet,
  // explorerUrl: "https://bscscan.com/",

  /** AVAX */
  // tokenName: "Avalanche (C-Chain)",
  // tokenSymbol: "AVAX",
  // decimals: 18,
  // rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  // chainId: "43114",
  // network: Network.Stagenet,
  // explorerUrl: "https://subnets.avax.network/c-chain",

  /** AA */
  // tokenName: "Arthera",
  // tokenSymbol: "AA",
  // decimals: 18,
  // rpcUrl: "https://rpc.arthera.net",
  // chainId: "10242",
  // network: Network.Stagenet,
  // explorerUrl: "https://explorer.arthera.net/",
};

export const TestJsonConfig: EvmChainJsonConfig = {
  /** 5ire */
  tokenName: "5ireChain",
  tokenSymbol: "5ire",
  decimals: 18,
  rpcUrl: "https://rpc.testnet.5ire.network",
  chainId: "997",
  network: Network.Testnet,
  explorerUrl: "https://testnet.5irescan.io/",

  // /** BSC */
  // tokenName: "BNB Smart Chain Testnet",
  // tokenSymbol: "tBNB",
  // decimals: 18,
  // rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  // chainId: "97",
  // network: Network.Testnet,
  // explorerUrl: "https://testnet.bscscan.com/",

  /** AVAX */
  // tokenName: "Avalanche (C-Chain)",
  // tokenSymbol: "AVAX",
  // decimals: 18,
  // rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  // chainId: "43113",
  // network: Network.Testnet,
  // explorerUrl: "https://subnets-test.avax.network/c-chain",

  /** AA */
  // tokenName: "Arthera",
  // tokenSymbol: "AA",
  // decimals: 18,
  // rpcUrl: "https://rpc-test.arthera.net",
  // chainId: "10243",
  // network: Network.Testnet,
  // explorerUrl: "https://explorer-test.arthera.net/",
};
