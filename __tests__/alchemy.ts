// import axios, { AxiosResponse } from "axios";

// const getApiUsage = async (): Promise<void> => {
//   try {
//     const response: AxiosResponse = await axios.post(
//       "https://eth-mainnet.alchemyapi.io/v2/GRyJOApwSFYywXEVFY4wiOgSLGMTv8qV",
//       {
//         // Add your request body here if needed
//       }
//     );

//     const rateLimit: string = response.headers["x-ratelimit-limit"];
//     const rateLimitRemaining: string =
//       response.headers["x-ratelimit-remaining"];
//     const rateLimitReset: string = response.headers["x-ratelimit-reset"];

//     console.log(`Rate Limit: ${rateLimit}`);
//     console.log(`Remaining Calls: ${rateLimitRemaining}`);
//     console.log(`Resets in: ${rateLimitReset} seconds`);
//   } catch (error) {
//     console.error("Error fetching API usage", error);
//   }
// };

// getApiUsage();

// import { Network, Alchemy } from "alchemy-sdk";

// // Optional Config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//   apiKey: "ScB3rPv8-erzAI3rLopGWvvW4oSMqpPE", // Replace with your Alchemy API Key.
//   network: Network.ETH_SEPOLIA, // Replace with your network.
// };

// const alchemy = new Alchemy(settings);

// // Access standard Ethers.js JSON-RPC node request
// alchemy.core.getBlockNumber().then(console.log);

// // Access Alchemy Enhanced API requests
// alchemy.core
//   .getTokenBalances("0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4")
//   .then(console.log);

import * as ethers from "ethers";

(async () => {
  const accountData = ethers.Wallet.fromMnemonic("smooth this jungle behave neglect trend brisk addict bone long like rocket");
  console.log(accountData.address);
  console.log(accountData.privateKey);
  console.log(accountData.publicKey);
})()