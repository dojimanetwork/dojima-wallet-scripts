import { Network } from "@xchainjs/xchain-client";
import { Client as ThorchainClient } from "@xchainjs/xchain-thorchain";
import { ThorchainClientParams } from "@xchainjs/xchain-thorchain/lib/client";
import {
  assetAmount,
  assetFromString,
  assetToBase,
  baseAmount,
  CryptoAmount,
} from "@xchainjs/xchain-util";
import { ThorchainQuery } from "@xchainjs/xchain-thorchain-query";
// import { ethers } from "ethers";

async function performThorchainSwap({
  sourceAsset,
  targetAsset,
  amount,
  recipientAddress,
  privateKey,
}: {
  sourceAsset: string;
  targetAsset: string;
  amount: string;
  recipientAddress: string;
  privateKey: string;
}) {
  try {
    // Set up Thorchain client
    const network: Network = Network.Testnet; // Change to Network.Mainnet for mainnet
    const thorchainParams: ThorchainClientParams = {
      network,
      phrase: privateKey, // Use private key or mnemonic for signing transactions
    };
    const thorClient = new ThorchainClient(thorchainParams);
    const thorQuery = new ThorchainQuery();

    // Define the assets
    const source = assetFromString(sourceAsset); // e.g., 'BNB.BNB'
    const target = assetFromString(targetAsset); // e.g., 'ETH.ETH'

    if (!source || !target) {
      throw new Error("Invalid asset string format.");
    }

    // Define the amount to swap
    const swapAmount = baseAmount(amount, 8); // Convert to base amount, decimals 8

    // Get swap quote (optional: check fee, slippage, etc.)
    const swapQuote = await thorQuery.quoteSwap({
      fromAsset: source,
      amount: new CryptoAmount(assetToBase(assetAmount(amount, 8)), source),
      destinationAddress: recipientAddress,
      destinationAsset: target,
      //   memo: `SWAP:${target.chain}.${target.symbol}:${recipientAddress}`,
    });

    console.log("Swap Quote:", swapQuote);

    // Perform the swap transaction
    const txHash = await thorClient.transfer({
      asset: source,
      amount: swapAmount,
      recipient: swapQuote.toAddress,
      memo: swapQuote.memo,
    });

    console.log(`Transaction Hash: ${txHash}`);
  } catch (error) {
    console.error("Error performing Thorchain swap:", error);
  }
}

// Example usage
const privateKey = "your-private-key-or-mnemonic-here";
performThorchainSwap({
  sourceAsset: "BNB.BNB", // The asset you are swapping from
  targetAsset: "ETH.ETH", // The asset you are swapping to
  amount: "100000000", // Amount in base units (e.g., 1 BNB = 100000000)
  recipientAddress: "recipient-address-here",
  privateKey: privateKey,
});
