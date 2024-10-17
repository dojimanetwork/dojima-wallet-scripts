// import {
//   AxelarAssetTransfer,
//   CHAINS,
//   Environment,
//   SendTokenParams,
//   //   AxelarQueryAPI,
// } from "@axelar-network/axelarjs-sdk";
// // import { ethers, Wallet } from "ethers";
// import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
// // import { Coin } from "@cosmjs/proto-signing";
// import { StdFee } from "@cosmjs/stargate";

// const api = new AxelarAssetTransfer({ environment: Environment.TESTNET });
// // const queryApi = new AxelarQueryAPI({ environment: Environment.TESTNET });

// // const getEvmSigner = () => {
// //   const privateKey =
// //     "0xae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0";
// //   return new Wallet(privateKey);
// // };

// console.log("Chains : ", CHAINS);

// // async function testEvm() {
// //   const provider = new ethers.providers.JsonRpcProvider(
// //     "https://api.avax-test.network/ext/bc/C/rpc"
// //   );
// //   const gasLimit = ethers.BigNumber.from("210000"); // Manually setting gas limit
// //   //   const gasPrice = await provider.getGasPrice(); // Fetching current gas price
// //   const maxFeePerGas = ethers.utils.parseUnits("30", "gwei"); // Max fee for the gas
// //   const maxPriorityFeePerGas = ethers.utils.parseUnits("2", "gwei"); // Max priority fee
// //   const signer = getEvmSigner().connect(provider);
// //   //   const estimatFee = await queryApi.estimateGasFee(
// //   //     CHAINS.TESTNET.AVALANCHE,
// //   //     CHAINS.TESTNET.OSMOSIS,
// //   //     700000,
// //   //     "auto"
// //   //   );
// //   //   console.log(estimatFee);
// //   const requestOptions: SendTokenParams = {
// //     fromChain: CHAINS.TESTNET.AVALANCHE,
// //     toChain: CHAINS.TESTNET.OSMOSIS,
// //     destinationAddress: "osmo1twx4xxktuzau88g6ts2k5exzue5azre3epy26f",
// //     asset: { symbol: "aUSDC" },
// //     amountInAtomicUnits: "1000000",
// //     options: {
// //       evmOptions: {
// //         signer,
// //         provider,
// //         // txOptions: null as any,
// //         txOptions: {
// //           gasLimit: gasLimit.toString(), // Convert BigNumber to string
// //           //   gasPrice: gasPrice.toString(), // Convert BigNumber to string
// //           maxFeePerGas: maxFeePerGas.toString(), // Convert BigNumber to string
// //           maxPriorityFeePerGas: maxPriorityFeePerGas.toString(), // Convert BigNumber to string
// //         },
// //         approveSendForMe: true,
// //       },
// //     },
// //   };

// //   const tx = await api.sendToken(requestOptions);
// //   console.log("Tx : ", tx);
// //   return tx;
// // }

// const getCosmosSigner = async () => {
//   // const mnemonic =
//   //   "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
//   const mnemonic = "inside spend sorry ski enter student neck antenna cry crop chunk stand rib dilemma long critic tumble route execute bar game caution vibrant plug";
//   const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "osmo" });
//   console.log("Signer : ", signer);
//   return signer;
// };

// async function testCosmos() {
//   // const offlineSigner = await getCosmosSigner();
//   // console.log("Off signer : ", offlineSigner);
//   // const requestOptions: SendTokenParams = {
//   //   fromChain: CHAINS.TESTNET.OSMOSIS,
//   //   toChain: CHAINS.TESTNET.AVALANCHE,
//   //   destinationAddress: "0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4",
//   //   asset: {
//   //     denom:
//   //       "ibc/6F34E1BD664C36CE49ACC28E60D62559A5F96C4F9A6CCE4FC5A67B2852E24CFE",
//   //   }, //aUSDC
//   //   amountInAtomicUnits: "1000000",
//   //   options: {
//   //     cosmosOptions: {
//   //       cosmosDirectSigner: offlineSigner,
//   //       // rpcUrl: "https://rpc.osmotest5.osmosis.zone",
//   //       rpcUrl: "https://rpc.testnet.osmosis.zone",
//   //       fee: {
//   //         gas: "250000",
//   //         amount: [{ denom: "uosmo", amount: "30000" }],
//   //       },
//   //     },
//   //   },
//   // };
//   // const tx = await api.sendToken(requestOptions);
//   // console.log("Tx cosmos : ", tx);
//   const offlineSigner = await getCosmosSigner();
//   const rpcUrl = "https://rpc.osmotest5.osmosis.zone";
//   const fee: StdFee = {
//     gas: "250000",
//     amount: [{ denom: "uosmo", amount: "30000" }],
//   };
//   // const transferAmount: Coin = {
//   //   denom:
//   //     "ibc/6F34E1BD664C36CE49ACC28E60D62559A5F96C4F9A6CCE4FC5A67B2852E24CFE",
//   //   amount: "1500000",
//   // };
//   const requestOptions: SendTokenParams = {
//     fromChain: CHAINS.TESTNET.OSMOSIS,
//     toChain: CHAINS.TESTNET.AVALANCHE,
//     destinationAddress: "0xB8Cd93C83A974649D76B1c19f311f639e62272BC",
//     options: {
//       cosmosOptions: {
//         cosmosDirectSigner: offlineSigner,
//         rpcUrl,
//         fee,
//       },
//     },
//     asset: {
//       denom:
//         "ibc/6F34E1BD664C36CE49ACC28E60D62559A5F96C4F9A6CCE4FC5A67B2852E24CFE",
//       symbol: "aUSDC",
//     },
//     amountInAtomicUnits: "1000000",
//     // coin: transferAmount,
//   };
//   const res = await api.sendToken(requestOptions);
//   console.log("ressss", res);
// }

// (async () => {
//   // await testEvm();
//   await testCosmos();
// })();

import {
  AxelarAssetTransfer,
  CHAINS,
  Environment,
} from "@axelar-network/axelarjs-sdk";

const axelarAssetTransfer = new AxelarAssetTransfer({
  environment: Environment.TESTNET,
});

async function main() {
  // const fromChain = CHAINS.TESTNET.AVALANCHE,
  //   toChain = CHAINS.TESTNET.OSMOSIS,
  //   destinationAddress = "osmo1twx4xxktuzau88g6ts2k5exzue5azre3epy26f",
  //   asset = "uausdc";

  const fromChain = CHAINS.TESTNET.AVALANCHE,
    toChain = CHAINS.TESTNET.POLYGON,
    destinationAddress = "0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4",
    asset = "avax";

  console.log("Started");
  
  const depositAddress = await axelarAssetTransfer.getDepositAddress({
    fromChain,
    toChain,
    destinationAddress,
    asset,
  });
  console.log("Address : ", depositAddress);
}

main();

// import {
//   AxelarQueryAPI,
//   CHAINS,
//   Environment,
// } from "@axelar-network/axelarjs-sdk";

// async function main() {
//   const axelarQuery = new AxelarQueryAPI({
//     environment: Environment.TESTNET,
//   });

//   const fee = await axelarQuery.getTransferFee(
//     CHAINS.TESTNET.OSMOSIS,
//     CHAINS.TESTNET.AVALANCHE,
//     "uausdc",
//     1000000
//   );
//   console.log("Fee : ", fee);
//   // returns  { fee: { denom: 'uausdc', amount: '150000' } }
// }

// main();
