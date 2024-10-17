import type {
  Chain,
  ChainAddress,
  ChainContext,
  Network,
  Signer,
//   TxHash,
} from "@wormhole-foundation/sdk";
import {
  DEFAULT_TASK_TIMEOUT,
  TokenTransfer,
  TransferState,
  Wormhole,
  amount,
//   api,
//   tasks,
} from "@wormhole-foundation/sdk";

import algorand from "@wormhole-foundation/sdk/algorand";
// import aptos from '@wormhole-foundation/sdk/aptos';
import cosmwasm from "@wormhole-foundation/sdk/cosmwasm";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import sui from "@wormhole-foundation/sdk/sui";

// Use .env.example as a template for your .env file and populate it with secrets
// for funded accounts on the relevant chain+network combos to run the example

// function getEnv(key: string): string {
//   // If we're in the browser, return empty string
//   if (typeof process === undefined) return "";

//   // Otherwise, return the env var or error
//   const val = process.env[key];
//   if (!val)
//     throw new Error(
//       `Missing env var ${key}, did you forget to set values in '.env'?`
//     );

//   return val;
// }

export interface SignerStuff<N extends Network, C extends Chain = Chain> {
  chain: ChainContext<N, C>;
  signer: Signer<N, C>;
  address: ChainAddress<C>;
}

export async function getSigner<N extends Network, C extends Chain>(
  chain: ChainContext<N, C>
): Promise<SignerStuff<N, C>> {
  // Read in from `.env`
  (await import("dotenv")).config();

  let signer: Signer;
  const platform = chain.platform.utils()._platform;
  switch (platform) {
    case "Solana":
      {
        const Sol = await solana();
        signer = await Sol.getSigner(
          await chain.getRpc(),
          //   getEnv("SOL_PRIVATE_KEY"),
          "NY3WuvLYNvPZskhZcjJFGjtLkpPkw59MP9Ch36gVWJH3NxbbZykvUS3Pzr1HPWEh9W7ZakwR33c59BPgWww9NRp",
          {
            debug: true,
            priorityFee: {
              // take the middle priority fee
              percentile: 0.5,
              // juice the base fee taken from priority fee percentile
              percentileMultiple: 2,
              // at least 1 lamport/compute unit
              min: 1,
              // at most 1000 lamport/compute unit
              max: 1000,
            },
          }
        );
      }

      break;
    case "Cosmwasm":
      {
        const CoWsm = await cosmwasm();
        signer = await CoWsm.getSigner(
          await chain.getRpc(),
          // getEnv("COSMOS_MNEMONIC")
          "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"
        );
      }
      break;
    case "Evm":
      {
        const Evm = await evm();
        signer = await Evm.getSigner(
          await chain.getRpc(),
          // getEnv("ETH_PRIVATE_KEY"),
          "0xae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0",
          {
            debug: true,
            maxGasLimit: amount.units(amount.parse("0.01", 18)),
            // overrides is a Partial<TransactionRequest>, so any fields can be overriden
            //overrides: {
            //  maxFeePerGas: amount.units(amount.parse("1.5", 9)),
            //  maxPriorityFeePerGas: amount.units(amount.parse("0.1", 9)),
            //},
          }
        );
      }
      break;
    case "Algorand":
      {
        const Algo = await algorand();
        signer = await Algo.getSigner(
          await chain.getRpc(),
          // getEnv("ALGORAND_MNEMONIC")
          "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"
        );
      }
      break;
    case "Sui":
      {
        const Sui = await sui();
        signer = await Sui.getSigner(
          await chain.getRpc(),
          // getEnv("SUI_PRIVATE_KEY")
          "0xae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0"
        );
      }
      break;
    default:
      throw new Error("Unrecognized platform: " + platform);
  }

  return {
    chain,
    signer: signer as Signer<N, C>,
    address: Wormhole.chainAddress(chain.chain, signer.address()),
  };
}

export async function waitLog<N extends Network = Network>(
  wh: Wormhole<N>,
  xfer: TokenTransfer<N>,
  tag: string = "WaitLog",
  timeout: number = DEFAULT_TASK_TIMEOUT
) {
  const tracker = TokenTransfer.track(
    wh,
    TokenTransfer.getReceipt(xfer),
    timeout
  );
  let receipt;
  for await (receipt of tracker) {
    console.log(
      `${tag}: Current trasfer state: `,
      TransferState[receipt.state]
    );
  }
  return receipt;
}
