import { Network } from "../../src/core/client";

export type EvmChainJsonConfig = {
  tokenName: string;
  tokenSymbol: string;
  decimals: number;
  rpcUrl: string;
  chainId: string;
  network: Network;
  explorerUrl?: string;
};
