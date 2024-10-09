import { CoreContracts } from "@arbitrum/orbit-sdk";

export type DeploymentPageState = {
  rollupContracts?: CoreContracts;
  rollupConfig: RollupConfig;
  validators?: Wallet[];
  batchPoster?: Wallet;
  chainType?: ChainType;
  isLoading: boolean;
  isDownloadCompleted: boolean;
};

export const ChainType = {
  Rollup: "Rollup",
  AnyTrust: "AnyTrust",
} as const;

export type ChainType = (typeof ChainType)[keyof typeof ChainType];

export type RollupConfig = {
  confirmPeriodBlocks: number;
  stakeToken: string;
  baseStake: number;
  owner: string;
  extraChallengeTimeBlocks: number;
  loserStakeEscrow: `0x${string}`;
  chainId: number;
  chainName: string;
  chainConfig: string;
  genesisBlockNum: number;
  nativeToken: string;
  sequencerInboxMaxTimeVariation: {
    delayBlocks: number;
    futureBlocks: number;
    delaySeconds: number;
    futureSeconds: number;
  };
};

export type Wallet = {
  address: string;
  privateKey?: string | undefined;
};

export type RollupConfigFormValues = {
  chainId: number;
  chainName: string;
  confirmPeriodBlocks: number;
  stakeToken: string;
  baseStake: number;
  owner: string;
  nativeToken: string;
  addresses: string[];
  batchPoster: {
    address: string;
    privateKey: string;
  };
};

export interface L3Config {
  chainOwner: string;
  rollup: string;
  inbox: string;
  outbox: string;
  adminProxy: string;
  sequencerInbox: string;
  bridge: string;
  utils: string;
  validatorWalletCreator: string;
  deployedAtBlockNumber: number;
  minL2BaseFee: number;
  networkFeeReceiver: string;
  infrastructureFeeCollector: string;
  batchPoster: string;
  staker: string;
  chainId: number;
  chainName: string;
  parentChainId: number;
  "parent-chain-node-url": string;
}
