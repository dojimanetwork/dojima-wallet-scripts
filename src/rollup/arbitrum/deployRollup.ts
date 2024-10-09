import { PublicClient, WalletClient, Address, zeroAddress, isAddress } from 'viem';
import {
  prepareChainConfig,
  prepareNodeConfig,
  CoreContracts,
  createRollupEnoughCustomFeeTokenAllowance,
  createRollupPrepareCustomFeeTokenApprovalTransactionRequest,
  createRollupPrepareDeploymentParamsConfig,
  createRollupPrepareTransactionRequest,
  createRollupPrepareTransactionReceipt,
  NodeConfig,
} from '@arbitrum/orbit-sdk';

import { ChainType, L3Config, RollupConfig, Wallet } from './types';
import { ChainId, getRpcUrl } from './utils';
import { buildL3Config, buildRollupConfigPayload } from './configBuilders';

type DeployRollupProps = {
  rollupConfig: RollupConfig;
  validators: Wallet[];
  batchPoster: Wallet;
  publicClient: PublicClient;
  walletClient: WalletClient;
  chainType?: ChainType;
  // account: Address;
  account: string;
};

export function assertIsAddress(value: any): asserts value is Address {
  if (typeof value !== 'string' || !isAddress(value)) {
    throw new Error(`${value} is not a valid address`);
  }
}

export function assertIsAddressArray(values: any[]): asserts values is Address[] {
  values.forEach(assertIsAddress);
}

export async function deployRollup({
  rollupConfig,
  validators,
  batchPoster,
  publicClient,
  walletClient,
  account,
  chainType = ChainType.Rollup,
}: DeployRollupProps): Promise<
{
  contracts: CoreContracts,
  config: {
    nodeConfig: NodeConfig,
    l3Config: L3Config
  }
}> {
  try {
    assertIsAddress(rollupConfig.owner);

    const chainConfig = prepareChainConfig({
      chainId: rollupConfig.chainId,
      arbitrum: {
        InitialChainOwner: rollupConfig.owner,
        DataAvailabilityCommittee: chainType === ChainType.AnyTrust,
      },
    });
    // @ts-ignore
    const rollupConfigPayload = createRollupPrepareDeploymentParamsConfig(publicClient, {
      chainConfig,
      ...buildRollupConfigPayload(rollupConfig),
    });

    const validatorAddresses = validators.map((v) => v.address);
    const batchPosterAddress = batchPoster.address;
    const nativeToken = rollupConfig.nativeToken;

    // custom gas token
    if (nativeToken !== zeroAddress) {
      // check if enough allowance on rollup creator for custom gas token
      const enoughAllowance = await createRollupEnoughCustomFeeTokenAllowance({
        nativeToken: nativeToken as Address,
        account: walletClient.account?.address!,
        publicClient,
      });

      if (!enoughAllowance) {
        // if not, create tx to approve tokens to be spent
        const txRequest = await createRollupPrepareCustomFeeTokenApprovalTransactionRequest({
          nativeToken: nativeToken as Address,
          account: walletClient.account?.address!,
          publicClient,
        });

        // submit and wait for tx to be confirmed
        // @ts-ignore
        await publicClient.waitForTransactionReceipt({
          // @ts-ignore
          hash: await walletClient.sendTransaction(txRequest),
        });
      }
    }

    console.log(chainConfig);
    console.log('Going for deployment');
    // // @ts-ignore
    // const parentChainId: ChainId = await publicClient.getChainId();
    const parentChainId = ChainId.ArbitrumSepolia;

    assertIsAddress(batchPosterAddress);
    assertIsAddress(nativeToken);
    assertIsAddressArray(validatorAddresses);

    const txRequest = await createRollupPrepareTransactionRequest({
      params: {
        config: rollupConfigPayload,
        batchPosters: [batchPosterAddress],
        validators: validatorAddresses,
        nativeToken,
      },
      account: walletClient.account?.address!,
      publicClient,
    });

    const txReceipt = createRollupPrepareTransactionReceipt(
      // @ts-ignore
      await publicClient.waitForTransactionReceipt({
        // @ts-ignore
        hash: await walletClient.sendTransaction(txRequest),
      }),
    );

    const coreContracts = txReceipt.getCoreContracts();

    const nodeConfig: NodeConfig = prepareNodeConfig({
      chainName: rollupConfig.chainName,
      chainConfig,
      coreContracts,
      batchPosterPrivateKey: batchPoster.privateKey || '',
      validatorPrivateKey: validators[0].privateKey || '',
      parentChainId,
      parentChainRpcUrl: getRpcUrl(parentChainId),
      dasServerUrl: 'http://das-server',
    });

    // Defining L3 config
    const l3Config: L3Config = await buildL3Config({
      address: account,
      rollupConfig,
      coreContracts,
      validators,
      batchPoster,
      parentChainId,
    });

    // updateLocalStorage(nodeConfig, l3Config);

    return {
      contracts: coreContracts,
      config: {
        nodeConfig: nodeConfig,
        l3Config: l3Config
      }
    };
  } catch (e) {
    throw new Error(`Failed to deploy rollup: ${e}`);
  }
}
