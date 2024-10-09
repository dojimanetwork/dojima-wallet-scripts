import { ChainType, DeploymentPageState, RollupConfig, RollupConfigFormValues, Wallet } from "./types";
import { generateChainId } from "@arbitrum/orbit-sdk/utils";
import { CoreContracts } from "@arbitrum/orbit-sdk";

export function getDefaultRollupConfig(owner: string = "") {
  return { ...generateDefaultRollupConfig(), owner };
}

export const generateDefaultRollupConfig: () => RollupConfig = () => ({
  confirmPeriodBlocks: 150,
  stakeToken: "0x0000000000000000000000000000000000000000",
  baseStake: 0.1,
  owner: "",
  extraChallengeTimeBlocks: 0,
  loserStakeEscrow: "0x0000000000000000000000000000000000000000",
  chainId: generateChainId(),
  chainName: "My Arbitrum L3 Chain",
  chainConfig:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  genesisBlockNum: 0,
  nativeToken: "0x0000000000000000000000000000000000000000",
  sequencerInboxMaxTimeVariation: {
    delayBlocks: 5760,
    futureBlocks: 48,
    delaySeconds: 86400,
    futureSeconds: 3600,
  },
});

export const deploymentDefaultValue: DeploymentPageState = {
  rollupConfig: generateDefaultRollupConfig(),
  rollupContracts: undefined,
  validators: undefined,
  batchPoster: undefined,
  chainType: undefined,
  isLoading: false,
  isDownloadCompleted: false,
};

// Retrieve the initial state from localStorage
function getDeploymentPageStateInitialValue(): DeploymentPageState {
  // if (typeof window === 'undefined') {
  //   return deploymentDefaultValue;
  // }

  // const stateInLocalStorage = localStorage.getItem('arbitrum:orbit:state');

  // if (stateInLocalStorage === null) {
  //   return deploymentDefaultValue;
  // }

  // return JSON.parse(stateInLocalStorage);
  return deploymentDefaultValue;
}

// Main class to handle the state and actions
export class DeploymentPageStateManager {
  public state: DeploymentPageState;
  private saveStateToLocalStorage: boolean;

  constructor(initialOwner: string = '') {
    this.state = {
      ...getDeploymentPageStateInitialValue(),
      rollupConfig: getDefaultRollupConfig(initialOwner),
    };
    this.saveStateToLocalStorage = true;
  }

  private saveState() {
    if (this.saveStateToLocalStorage) {
      // localStorage.setItem('arbitrum:orbit:state', JSON.stringify(this.state));
    }
  }

  // Function to update rollup contracts
  updateRollupContracts(rollupContracts: CoreContracts) {
    this.state.rollupContracts = rollupContracts;
    this.saveState();
  }

  // Function to update rollup config
  updateRollupConfig(configUpdates: Partial<RollupConfigFormValues>) {
    this.state.rollupConfig = { ...this.state.rollupConfig, ...configUpdates };
    this.saveState();
  }

  // Function to update chain type
  updateChainType(chainType: ChainType) {
    this.state.chainType = chainType;
    this.saveState();
  }

  // Function to update validators
  updateValidators(validators: Wallet[]) {
    this.state.validators = validators;
    this.saveState();
  }

  // Function to update batch poster
  updateBatchPoster(batchPoster: Wallet) {
    this.state.batchPoster = batchPoster;
    this.saveState();
  }

  // Function to update loading state
  setLoading(isLoading: boolean) {
    this.state.isLoading = isLoading;
    this.saveState();
  }

  // Function to update download completion state
  setDownloadCompleted(isDownloadCompleted: boolean) {
    this.state.isDownloadCompleted = isDownloadCompleted;
    this.saveState();
  }

  // Function to reset the state with a new owner
  resetState(owner: string) {
    this.state = {
      ...deploymentDefaultValue,
      rollupConfig: getDefaultRollupConfig(owner),
    };
    this.saveState();
  }

  // Function to get the current state
  getState(): DeploymentPageState {
    return this.state;
  }

  // Function to toggle saving state to localStorage
  setSaveStateToLocalStorage(save: boolean) {
    this.saveStateToLocalStorage = save;
  }
}