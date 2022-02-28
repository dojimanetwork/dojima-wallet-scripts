import { accounts, acc } from "../src/accounts";

// async function newAccount() {
//     console.log("_________Ethereum Account_________");
//     console.log(accounts.getEth());
//     console.log("_________Bitcoin Account_________");
//     console.log(accounts.getBitcoin());
//     console.log("_________Solana Account_________");
//     console.log(accounts.getSolana());
//     console.log("_________Polkadot Account_________");
//     console.log(accounts.getPolkadot());
//     console.log("_________Arweave Account_________");
//     try {
//         let res = await accounts.getArweave();
//         console.log("Result -- "+res);
//         return res
//     } catch (error) {
//         console.log(error);
//     }
// }

// console.log(newAccount());

// console.log(accounts.createAccount());

console.log(acc.create());
