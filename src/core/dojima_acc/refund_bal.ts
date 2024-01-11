// import * as fs from "fs";
// import * as path from "path";
// import { parse } from 'csv-parse';
// import axios from "axios";
import * as ethers from "ethers";
import {BigNumber} from "ethers";
import axios from "axios";
import {
    AccountsDataResult,
    AccountsResult
} from "./client";
// import {findAllUsers} from "./db/dev-dashboard/users/methods";


// type AddressList = {
//     address: string;
//     private_key: string
// }

async function getAccountsFromDB(): Promise<AccountsDataResult[]> {
    const res = await axios.get('https://fiber-test.h4s.dojima.network/api/v1/all_accounts');
    const dataRes: AccountsResult = res.data
    return dataRes.data
}

// export type AccountsMDBDataResult = {
//     _id: any,
//     id: any,
//     hermes_address: string,
//     dojima_address: string,
//     mnemonic: string,
//     time: string
// }
//
// async function getAccountsFromMDB(): Promise<AccountsMDBDataResult[]> {
//     const res = await findAllUsers();
//     console.log('Res : ', res)
//     return res
// }

// (() => {
//     const csvFilePath = path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/dojima_add.csv');
//
//     const headers = ['address', 'private_key'];
//
//     const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
//
//     parse(fileContent, {
//         delimiter: ',',
//         columns: headers,
//     }, async (error, result: AddressList[]) => {
//         if (error) {
//             console.error(error);
//         }
//         const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network:8545/');
//         const pickRandomNumber = (min: number, max: number): number => {
//             return Math.floor(Math.random() * (max - min + 1)) + min
//         }
//         let nextBlock: Array<any> = []
//         let accountIndex: number = 32140
//         const accLoop = async () => {
//             provider.on('block', (block) => {
//                 if(accountIndex > (result.length - 1)){
//                     throw Error('Balances empty')
//                 }
//                 // console.log('Nxt :: ', nextBlock)
//                 if (
//                     nextBlock !== [] && nextBlock[0] < block
//                 ) {
//                     // console.log('Nxt less :: ', nextBlock, ' < :: ', block)
//                     if(nextBlock !== [] && nextBlock[0] < block){
//                         // console.log('Nxt less :: ', nextBlock, ' < :: ', block)
//                         console.log('Index : ', accountIndex)
//                         const res = pickRandomNumber(1, 40)
//                         nextBlock.pop()
//                         nextBlock.push(block + res)
//                         // console.log('Nxt less :: ', block + res)
//                         return
//                     }
//                 }
//                 try {
//                     if (
//                         nextBlock !== [] && nextBlock[0] === block
//                     ) {
//                         provider.getBlock(block).then(async () => {
//                                 const res = pickRandomNumber(1, 10)
//                                 nextBlock.pop()
//                                 nextBlock.push(block + res)
//                                 // console.log('Nxt :: ', block + res)
//                                 const accounts = result ;
//                                 const sourceRandomArrayIndex = accountIndex;
//                                 const _source = new ethers.Wallet(accounts[sourceRandomArrayIndex].private_key);
//                                 const source = _source.connect(provider);
//                                 const sourceBalance = await provider.getBalance(source.address);
//                             console.log(sourceBalance)
//                             const txBuffer = ethers.utils.parseEther(".005");
//                                 if (Number(sourceBalance.sub(txBuffer)) > 0) {
//                                     const remainingAmount = sourceBalance.sub(txBuffer);
//                                     const transferAmount = BigNumber.from((Number(remainingAmount)).toFixed())
//                                     try {
//                                         console.log('Index : ', accountIndex, ' : ', transferAmount)
//                                         await source.sendTransaction({
//                                             to: '0x53c7C9d2CAA6942CdA9A86bd729EA4461Ef5AE40',
//                                             value: transferAmount
//                                         });
//                                         accountIndex = sourceRandomArrayIndex + 1
//                                     } catch (e) {
//                                         return
//                                     }
//                                 } else {
//                                     console.log('Empty block : ', sourceRandomArrayIndex)
//                                     accountIndex = sourceRandomArrayIndex + 1
//                                 }
//                             })
//
//                     } else {
//                         if (nextBlock.length === 0) {
//                             const res = pickRandomNumber(1, 10)
//                             nextBlock.push(block + res)
//                         }
//                     }
//                 } catch (e) {
//                     console.error(e)
//                 }
//             })
//         }
//         accLoop()
//     });
// })();

// (async () => {
//     const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network/');
//     const pickRandomNumber = (min: number, max: number): number => {
//         return Math.floor(Math.random() * (max - min + 1)) + min
//     }
//     let nextBlock: Array<any> = []
//     const allAccounts= await getAccountsFromDB()
//     // const allAccounts= await getAccountsFromMDB()
//     // console.log(allAccounts)
//     let accountIndex: number = 103439
//     const accLoop = async () => {
//         try {
//             provider.on('block', (block) => {
//                 if(accountIndex > (allAccounts.length - 1)){
//                     throw Error('Balances empty')
//                 }
//                 // console.log('Nxt :: ', nextBlock)
//                 if (
//                     nextBlock !== [] && nextBlock[0] < block
//                 ) {
//                     // console.log('Nxt less :: ', nextBlock, ' < :: ', block)
//                     if(nextBlock !== [] && nextBlock[0] < block){
//                         // console.log('Nxt less :: ', nextBlock, ' < :: ', block)
//                         console.log('Index : ', accountIndex)
//                         const res = pickRandomNumber(1, 40)
//                         nextBlock.pop()
//                         nextBlock.push(block + res)
//                         // console.log('Nxt less :: ', block + res)
//                         return
//                     }
//                 }
//                 try {
//                     if (
//                         nextBlock !== [] && nextBlock[0] === block
//                     ) {
//                         provider.getBlock(block).then(async () => {
//                             const res = pickRandomNumber(1, 10)
//                             nextBlock.pop()
//                             nextBlock.push(block + res)
//                             // console.log('Nxt :: ', block + res)
//                             const accounts = allAccounts ;
//                             const sourceRandomArrayIndex = accountIndex;
//                             const accountData = ethers.Wallet.fromMnemonic(accounts[sourceRandomArrayIndex].mnemonic)
//                             const _source = new ethers.Wallet(accountData.privateKey);
//                             const source = _source.connect(provider);
//                             const sourceBalance = await provider.getBalance(source.address);
//                             const txBuffer = ethers.utils.parseEther(".005");
//                             if (Number(sourceBalance.sub(txBuffer)) > 0) {
//                                 const remainingAmount = sourceBalance.sub(txBuffer);
//                                 const transferAmount = BigNumber.from((Number(remainingAmount)).toFixed())
//                                 try {
//                                     console.log('Index : ', accountIndex, ' : ', transferAmount)
//                                     await source.sendTransaction({
//                                         to: '0x53c7C9d2CAA6942CdA9A86bd729EA4461Ef5AE40',
//                                         value: transferAmount
//                                     });
//                                     accountIndex = sourceRandomArrayIndex + 1
//                                 } catch (e) {
//                                     return
//                                 }
//                             } else {
//                                 console.log('Empty block : ', sourceRandomArrayIndex)
//                                 const ramdomAddressIndex = pickRandomNumber(2, allAccounts.length-1)
//                                 axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${accounts[ramdomAddressIndex].dojima_address}`).then(() => {
//                                     return
//                                 })
//                                 accountIndex = sourceRandomArrayIndex + 1
//                             }
//                         })
//
//                     } else {
//                         if (nextBlock.length === 0) {
//                             const res = pickRandomNumber(1, 10)
//                             nextBlock.push(block + res)
//                         }
//                     }
//                 } catch (e) {
//                     console.error(e)
//                     accLoop()
//                 }
//             })
//         } catch (e) {
//             accLoop()
//         }
//     }
//     accLoop()
// })();

(async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network/');
    const allAccounts= await getAccountsFromDB(); // 128556
    let accountIndex: number = 1
    const accLoop = async () => {
        try {
            provider.on('block', (block) => {
                if(accountIndex > (allAccounts.length - 1)){
                    throw Error('Balances empty')
                }
                // console.log('Nxt :: ', nextBlock)
                try {
                    provider.getBlock(block).then(async () => {
                        const accounts = allAccounts ;
                        const sourceRandomArrayIndex = accountIndex;
                        const accountData = ethers.Wallet.fromMnemonic(accounts[sourceRandomArrayIndex].mnemonic)
                        const _source = new ethers.Wallet(accountData.privateKey);
                        const source = _source.connect(provider);
                        const sourceBalance = await provider.getBalance(source.address);
                        const txBuffer = ethers.utils.parseEther(".005");
                        if (Number(sourceBalance.sub(txBuffer)) > 0) {
                            const remainingAmount = sourceBalance.sub(txBuffer);
                            const transferAmount = BigNumber.from((Number(remainingAmount)).toFixed())
                            try {
                                console.log('Index : ', accountIndex, ' : ', transferAmount)
                                await source.sendTransaction({
                                    to: '0x53c7C9d2CAA6942CdA9A86bd729EA4461Ef5AE40',
                                    value: transferAmount
                                });
                                accountIndex = sourceRandomArrayIndex + 1
                            } catch (e) {
                                return
                            }
                        } else {
                            console.log('Empty block : ', sourceRandomArrayIndex)
                            accountIndex = sourceRandomArrayIndex + 1
                        }
                    })
                } catch (e) {
                    console.error(e)
                    accLoop()
                }
            })
        } catch (e) {
            accLoop()
        }
    }
    accLoop()
})();