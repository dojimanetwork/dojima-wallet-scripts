// import * as ethers from "ethers";
// import {
//     // accounts, addresses,
//     // phrases
// } from "./accounts";
// import {BigNumber} from "ethers";
// import axios from "axios";
// // import BigNumber from "bignumber.js";
// // import Web3 from "web3";
//
// export type FaucetResult = {
//     data: any,
//     message: string,
//     status: string
// }
//
// export type AccountsDataResult = {
//     id: string,
//     address: string,
//     private_key: string,
//     time: string
// }
//
// export type AccountsResult = {
//     data: Array<AccountsDataResult>,
//     message: string,
//     status: string
// }
//
// function postAccountToDB(address: string, pkey: string) {
//     const data = JSON.stringify({
//         "address": address,
//         "private_key": pkey
//     });
//
//     const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://fiber-test.h4s.dojima.network/api/v1/create_account',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data : data
//     };
//
//     axios(config)
//         .then(function (response) {
//             console.log(JSON.stringify(response.data));
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
//
// async function getAccountsFromDB(): Promise<AccountsDataResult[]> {
//     const res = await axios.get('https://fiber-test.h4s.dojima.network/api/v1/all_accounts')
//     const dataRes: AccountsResult = res.data
//     return dataRes.data
// }
//
// export async function Bot() {
//     const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network:8545/');
//     const pickRandomNumber = (min: number, max: number): number => {
//         return Math.floor(Math.random() * (max - min + 1)) + min
//     }
//     let nextBlock: Array<any> = []
//     const bot = async () => {
//         provider.on('block', (block) => {
//             console.log('Next block Array : ', nextBlock)
//             try {
//                 console.log('Block Number : ', block)
//                 if (nextBlock !== [] && nextBlock[0] === block) {
//                     provider.getBlock(block).then(async (b) => {
//                         const res = pickRandomNumber(1, 20)
//                         nextBlock.pop()
//                         nextBlock.push(block+res)
//                         const accounts = await getAccountsFromDB();
//                         // const sourceRandomArrayIndex = Math.floor(Math.random() * accounts.length);
//                         // const targetRandomArrayIndex = Math.floor(Math.random() * accounts.length);
//                         const sourceRandomArrayIndex = pickRandomNumber(14, accounts.length);
//                         const targetRandomArrayIndex = pickRandomNumber(14, accounts.length);
//                         // const targetAddress = addresses[targetRandomArrayIndex];
//                         const targetAddress = accounts[targetRandomArrayIndex].address;
//                         console.log(targetAddress)
//                         // const _source = new ethers.Wallet(accounts[sourceRandomArrayIndex]);
//                         const _source = new ethers.Wallet(accounts[sourceRandomArrayIndex].private_key);
//                         const source = _source.connect(provider);
//                         console.log(source.address)
//                         const sourceBalance = await provider.getBalance(source.address);
//                         console.log(Number(sourceBalance))
//                         if(Number(sourceBalance) <= Number(ethers.utils.parseEther('0.5'))) {
//                             axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${source.address}`).then(() => {
//                                 return
//                             })
//                         }
//                         const txBuffer = ethers.utils.parseEther(".005");
//                         console.log(Number(txBuffer))
//                         if (Number(sourceBalance.sub(txBuffer)) > 0) {
//                             const remainingAmount = sourceBalance.sub(txBuffer);
//                             console.log(Number(remainingAmount))
//                             const randomPercent = pickRandomNumber(1, 80) / 100
//                             console.log(randomPercent)
//                             const amount = BigNumber.from((Number(remainingAmount) * randomPercent).toFixed())
//                             console.log(Number(amount))
//                             try {
//                                 await source.sendTransaction({
//                                     to: targetAddress,
//                                     value: amount
//                                 });
//                             } catch (e) {
//                                 return
//                             }
//                         } else {
//                             // let accounts: Array<string> = []
//                             // let accountPhrase: Array<string> = []
//                             // const acc = ethers.Wallet.createRandom()
//                             // accountPhrase.push(acc.mnemonic.phrase)
//                             // accounts.push(acc.privateKey)
//                             // axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${acc.address}`).then(() => {
//                             //     return
//                             // })
//                             const acc = ethers.Wallet.createRandom()
//                             postAccountToDB(acc.address, acc.privateKey)
//                             axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${acc.address}`).then(() => {
//                                 return
//                             })
//                         }
//                     })
//                 } else {
//                     if (nextBlock.length === 0) {
//                         const res = pickRandomNumber(1, 10)
//                         nextBlock.push(block + res)
//                     } else {
//                         return
//                     }
//                 }
//             } catch (e) {
//                 console.error(e)
//             }
//         })
//     }
//     bot()
// }
//
// //
// // export default class EthereumBot {
// //     protected account: ethers.ethers.Wallet;
// //     constructor(phrase: string) {
// //         this.account = ethers.Wallet.fromMnemonic(phrase);
// //     }
// //
// //     getAddress(phrase: string) {
// //         const acc = ethers.Wallet.fromMnemonic(phrase);
// //         return acc.address
// //     }
// //
// //     getPK() {
// //         let accounts: Array<string> = []
// //         let accountPhrase: Array<string> = []
// //         for (let i = 0; i < 1; i++) {
// //             const acc = ethers.Wallet.createRandom()
// //             accountPhrase.push(acc.mnemonic.phrase)
// //             accounts.push(acc.privateKey)
// //         }
// //         console.log(accountPhrase)
// //         console.log(accounts)
// //         return this.account.privateKey
// //     }
// //
// //     botSt() {
// //         const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/223a5a7947294b38aab5b846faee8eb3');
// //         // const addressReceiver = `${this.account.address}`;
// //         let nextBlock: Array<any> = []
// //         const bot = async () => {
// //             provider.on('block', (block) => {
// //                 console.log('Next block Array : ', nextBlock)
// //                 try {
// //                     console.log('Block Number : ', block)
// //                     if(nextBlock !== [] && nextBlock[0] === block) {
// //                         provider.getBlock(block).then((b) => {
// //                             console.log('Block No. : ', nextBlock[0])
// //                             console.log('Block : ', b.hash)
// //                             const min = 1
// //                             const max = 5
// //                             const res = Math.floor(Math.random() * (max - min + 1)) + min
// //                             console.log('Res no. : ', res)
// //                             console.log('Res+block no. : ', block+res)
// //                             nextBlock.pop()
// //                             nextBlock.push(block+res)
// //                         })
// //                     } else {
// //                         if(nextBlock.length === 0) {
// //                             const min = 1
// //                             const max = 5
// //                             const res = Math.floor(Math.random() * (max - min + 1)) + min
// //                             console.log('Empty Res no. : ', res)
// //                             nextBlock.push(block+res)
// //                         } else {
// //                             console.log('Block not reached yet')
// //                         }
// //                     }
// //                 } catch (e) {
// //                     console.error(e)
// //                 }
// //             })
// //             // provider.on("block", async () => {
// //             //     console.log("Listening new block, waiting..)");
// //             //     for (let i = 0; i < accounts.length; i++) {
// //             //         const _target = new ethers.Wallet(accounts[i]);
// //             //         const target = _target.connect(provider);
// //             //         const balance = await provider.getBalance(target.address);
// //             //         const txBuffer = ethers.utils.parseEther(".005");
// //             //         if (balance.sub(txBuffer).toNumber() > 0) {
// //             //             console.log("NEW ACCOUNT WITH ETH!");
// //             //             const amount = balance.sub(txBuffer);
// //             //             try {
// //             //                 await target.sendTransaction({
// //             //                     to: addressReceiver,
// //             //                     value: amount
// //             //                 });
// //             //                 console.log(`Success! transfered --> ${ethers.utils.formatEther(balance)}`);
// //             //             }
// //             //             catch (e) {
// //             //                 console.log(`error: ${e}`);
// //             //             }
// //             //         }
// //             //     }
// //             // });
// //         }
// //
// //         bot();
// //     }
// //
// //     async botWeb3() {
// //         // const web3 = new Web3('https://eth-test.h4s.dojima.network/');
// //         // // web3.eth.subscribe(
// //         // //     "newBlockHeaders",
// //         // //     (err, result) => {
// //         // //         const { number } = result;
// //         // //         console.log(number)
// //         // //     });
// //         // web3.eth.getBlockNumber().then(res => {
// //         //     console.log(res)
// //         // })
// //         const provider = new ethers.providers.JsonRpcProvider('https://eth-test.h4s.dojima.network/');
// //         // const addressReceiver = `${this.account.address}`;
// //         let nextBlock: Array<any> = []
// //         const bot = async () => {
// //             provider.on('block', (block) => {
// //                 console.log('Next block Array : ', nextBlock)
// //                 try {
// //                     console.log('Block Number : ', block)
// //                     if(nextBlock !== [] && nextBlock[0] === block) {
// //                         provider.getBlock(block).then(async (b) => {
// //                             console.log('Block No. : ', nextBlock[0])
// //                             console.log('Block : ', b.hash)
// //                             const res = this.pickRandomNumber(1, 5)
// //                             console.log('Res no. : ', res)
// //                             console.log('Res+block no. : ', block+res)
// //                             nextBlock.pop()
// //                             nextBlock.push(block+res)
// //
// //                             // get random index value
// //                             const fromRandomIndex = Math.floor(Math.random() * accounts.length);
// //                             console.log('From index : ', fromRandomIndex)
// //                             // const _sender = new ethers.Wallet(accounts[fromRandomIndex]);
// //                             // const sender = _sender.connect(provider);
// //                             // console.log('Sender : ', sender.address)
// //                             // const balance = await provider.getBalance(sender.address)
// //                             // console.log('Sender bal : ', Number(balance))
// //                             // if(Number(balance) <= Number(ethers.utils.parseEther('0.5'))) {
// //                             //     const response = await axios.post(`https://faucet.h4s.dojima.network/api/v1/ETH/${sender.address}`)
// //                             //     if(response.status !== 200) {
// //                             //         console.warn('Balance not added. Request failed')
// //                             //     }
// //                             //     const data: FaucetResult = response.data
// //                             //     if(data.status === 'success') {
// //                             //         return
// //                             //     }
// //                             // } else {
// //                             //     console.log('Result')
// //                             // }
// //                             const toRandomIndex = Math.floor(Math.random() * accounts.length);
// //                             console.log('To index : ', toRandomIndex)
// //                             const toAddress = this.getAddress(phrases[toRandomIndex]);
// //                             console.log('To address : ', toAddress)
// //                             const randomPercent = this.pickRandomNumber(1, 80)
// //                             console.log('Rndm Prct : ', randomPercent)
// //                             // const toAmount = new BigNumber(Number(balance) * (randomPercent / 100))
// //                             // //     // (balance.toNumber()) * (this.pickRandomNumber(1, 80) / 100)
// //                             // console.log('To amt : ', Number(toAmount))
// //                             // // // const toAmountBN = BigNumber.from(toAmount.toFixed())
// //                             // // // console.log('To amt BN : ', toAmountBN)
// //                             // console.log('Gas Amount : ', Number(toAmount) / Math.pow(10, 18))
// //                             // // const gasFee = await provider.estimateGas({
// //                             // //     from: sender.address,
// //                             // //     to: toAddress,
// //                             // //     value: Number(toAmount) / Math.pow(10, 18)
// //                             // // })
// //                             // // console.log('Gas fee : ', gasFee)
// //                             // const txBuffer = ethers.utils.parseEther(".005");
// //                             // console.log('Tx buffer : ', Number(txBuffer))
// //                             // console.log('Minus : ', Number(toAmount.minus(Number(txBuffer))), ' :: ', Number(ethers.utils.parseEther('0')))
// //                             // // if (toAmount.sub(txBuffer) > ethers.utils.parseEther('0')) {
// //                             // if (Number(toAmount.minus(Number(txBuffer))) > Number(ethers.utils.parseEther('0'))) {
// //                             //     console.log("NEW ACCOUNT WITH ETH!");
// //                             //     // const amount = toAmount.sub(txBuffer);
// //                             //     const amount = toAmount.minus(Number(txBuffer))
// //                             //     console.log('Amount : ', Number(amount))
// //                             //     console.log('Amount BN : ', ethers.utils.parseEther(`${amount}`))
// //                             //     // try {
// //                             //     //     const response = await sender.sendTransaction({
// //                             //     //         to: toAddress,
// //                             //     //         // value: amount
// //                             //     //         value: ethers.utils.parseEther(`${amount}`)
// //                             //     //     });
// //                             //     //     console.log('Response : ', response)
// //                             //     //     console.log(`Success! transfered --> ${ethers.utils.formatEther(balance)}`);
// //                             //     // } catch (e) {
// //                             //     //     console.log(`error: ${e}`);
// //                             //     // }
// //                             // }
// //                             const _target = new ethers.Wallet(accounts[fromRandomIndex]);
// //                                     const target = _target.connect(provider);
// //                                     const balance = await provider.getBalance(target.address);
// //                             console.log(balance)
// //                             console.log(BigNumber.from(Number(balance).toFixed()))
// //                             console.log(Number(balance))
// //                                     const txBuffer = ethers.utils.parseEther(".005");
// //                             console.log(Number(txBuffer))
// //                             console.log(Number(balance.sub(txBuffer)))
// //                             console.log((Number(balance.sub(txBuffer)) * (randomPercent / 100)))
// //                                     if (Number(balance.sub(txBuffer)) > 0) {
// //                                         console.log("NEW ACCOUNT WITH ETH!");
// //                                         const remainingAmount = balance.sub(txBuffer);
// //                                         console.log(remainingAmount)
// //                                         const amount = BigNumber.from((Number(remainingAmount) * (randomPercent / 100)).toFixed())
// //                                         console.log(amount)
// //                                         try {
// //                                             const response = await target.sendTransaction({
// //                                                 to: toAddress,
// //                                                 value: amount
// //                                             });
// //                                             console.log('Response : ', response)
// //                                             console.log(`Success! transfered --> ${ethers.utils.formatEther(balance)}`);
// //                                         } catch (e) {
// //                                             console.log(`error: ${e}`);
// //                                         }
// //                                     }
// //                         })
// //                     } else {
// //                         if(nextBlock.length === 0) {
// //                             const min = 1
// //                             const max = 5
// //                             const res = Math.floor(Math.random() * (max - min + 1)) + min
// //                             console.log('Empty Res no. : ', res)
// //                             nextBlock.push(block+res)
// //                         } else {
// //                             console.log('Block not reached yet')
// //                         }
// //                     }
// //                 } catch (e) {
// //                     console.error(e)
// //                 }
// //             })
// //             // provider.on("block", async () => {
// //             //     console.log("Listening new block, waiting..)");
// //             //     for (let i = 0; i < accounts.length; i++) {
// //             //         const _target = new ethers.Wallet(accounts[i]);
// //             //         const target = _target.connect(provider);
// //             //         const balance = await provider.getBalance(target.address);
// //             //         const txBuffer = ethers.utils.parseEther(".005");
// //             //         if (balance.sub(txBuffer).toNumber() > 0) {
// //             //             console.log("NEW ACCOUNT WITH ETH!");
// //             //             const amount = balance.sub(txBuffer);
// //             //             try {
// //             //                 await target.sendTransaction({
// //             //                     to: addressReceiver,
// //             //                     value: amount
// //             //                 });
// //             //                 console.log(`Success! transfered --> ${ethers.utils.formatEther(balance)}`);
// //             //             }
// //             //             catch (e) {
// //             //                 console.log(`error: ${e}`);
// //             //             }
// //             //         }
// //             //     }
// //             // });
// //         }
// //
// //         bot();
// //     }
// // }