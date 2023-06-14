import * as ethers from "ethers";
import {BigNumber} from "ethers";
import axios from "axios";
import {DOJ_DECIMAL, HermesSdkClient} from "../hermes";
import {Network} from "../client";
import {assetAmount, assetToBase, baseToAsset} from "../utils";

export type AccountsDataResult = {
    id: string,
    hermes_address: string,
    dojima_address: string,
    mnemonic: string,
    time: string
}

export type AccountsResult = {
    data: Array<AccountsDataResult>,
    message: string,
    status: string
}

function postAccountToDB(mnemonic: string, dojima_address: string, hermes_address: string) {
    var data = JSON.stringify({
        "mnemonic": mnemonic,
        "dojima_address": dojima_address,
        "hermes_address": hermes_address
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://fiber-test.h4s.dojima.network/api/v1/create_account',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            console.log()
        })
        .catch(function (error) {
            console.log(error);
        });

}

async function getAccountsFromDB(): Promise<AccountsDataResult[]> {
    const res = await axios.get('https://fiber-test.h4s.dojima.network/api/v1/all_accounts')
    const dataRes: AccountsResult = res.data
    return dataRes.data
}

(() => {
    const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network:8545/');
    const pickRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    let nextBlock: Array<any> = []
    let nextBlockForNewAcc: Array<any> = []
    const accLoop = async () => {
        provider.on('block', (block) => {
            // console.log('Nxt :: ', nextBlock)
            // console.log('Nxt Acc :: ', nextBlockForNewAcc)
            if (nextBlock !== [] && (nextBlock[0] + 1) === block) {
                const hermesLoop = async () => {
                    const accounts = await getAccountsFromDB();
                    const randomArrayIndex = pickRandomNumber(2, accounts.length - 1);
                    const hermesClient = new HermesSdkClient({
                        phrase: accounts[randomArrayIndex].mnemonic,
                        network: Network.DojTestnet
                    });
                    const balanceObj = await hermesClient.getBalance(accounts[randomArrayIndex].hermes_address)
                    const balance = (baseToAsset(balanceObj[0].amount)).amount();
                    if (Number(balance) <= 0.02) {
                        axios.post(`https://faucet.h4s.dojima.network/api/v1/H4S/${accounts[randomArrayIndex].hermes_address}`).then(() => {
                            return
                        })
                        return
                    }
                    if ((Number(balance) - 0.02) > 0) {
                        const remainingAmount = Number(balance) - 0.02;
                        let targetAddress: string, transferAmount: number
                        if(remainingAmount >= 0.1) {
                            transferAmount = remainingAmount
                            targetAddress = 'dojima1glcnqvd7k3s3ktgkjj8apdvls79vwfwglux2yr'
                        } else {
                            const targetRandomArrayIndex = pickRandomNumber(2, accounts.length - 1);
                            targetAddress = accounts[targetRandomArrayIndex].dojima_address;
                            const randomPercent = pickRandomNumber(1, 80) / 100
                            transferAmount = remainingAmount * randomPercent
                        }
                        try {
                            let amount = assetToBase(assetAmount(transferAmount, DOJ_DECIMAL ))
                            await hermesClient.transfer({
                                amount,
                                recipient: targetAddress
                            });
                        } catch (e) {
                            const acc = ethers.Wallet.createRandom()
                            const hermesClient = new HermesSdkClient({phrase: acc.mnemonic.phrase, network: Network.DojTestnet});
                            const hermes_address = hermesClient.getAddress();
                            postAccountToDB(acc.mnemonic.phrase, acc.address, hermes_address)
                            // axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${acc.address}`).then(() => {
                            //     // return
                            // })
                            axios.post(`https://faucet.h4s.dojima.network/api/v1/H4S/${hermes_address}`).then(() => {
                                // return
                            })
                            return
                        }
                    }
                }
                hermesLoop()
            }
            if (
                (nextBlock !== [] && nextBlock[0] < block) || (nextBlockForNewAcc !== [] && nextBlockForNewAcc[0] < block)
            ) {
                console.log('Nxt less :: ', nextBlock, ' < :: ', block, ' || ', nextBlockForNewAcc)
                if(nextBlock !== [] && nextBlock[0] < block){
                    console.log('Nxt less :: ', nextBlock, ' < :: ', block)
                    const res = pickRandomNumber(1, 40)
                    nextBlock.pop()
                    nextBlock.push(block + res)
                }
                if(nextBlockForNewAcc !== [] && nextBlockForNewAcc[0] < block){
                    console.log('Nxt Acc less :: ', nextBlockForNewAcc, ' < :: ', block)
                    const res = pickRandomNumber(1, 60)
                    nextBlockForNewAcc.pop()
                    nextBlockForNewAcc.push(block + res)
                }
            }
            try {
                if (
                    (nextBlock !== [] && nextBlock[0] === block) || (nextBlockForNewAcc !== [] && nextBlockForNewAcc[0] === block)
                ) {
                    // if(nextBlock !== [] && nextBlock[0] < block){
                    //     console.log('Nxt less :: ', nextBlock, ' < :: ', block)
                    //     const res = pickRandomNumber(1, 40)
                    //     nextBlock.pop()
                    //     nextBlock.push(block + res)
                    // }
                    // if(nextBlockForNewAcc !== [] && nextBlockForNewAcc[0] < block){
                    //     console.log('Nxt Acc less :: ', nextBlockForNewAcc, ' < :: ', block)
                    //     const res = pickRandomNumber(1, 60)
                    //     nextBlockForNewAcc.pop()
                    //     nextBlockForNewAcc.push(block + res)
                    // }
                    if(nextBlockForNewAcc !== [] && nextBlockForNewAcc[0] === block) {
                        if(nextBlock[0] === nextBlockForNewAcc[0]) {
                            const res = pickRandomNumber(1, 40)
                            nextBlock.pop()
                            nextBlock.push(block + res)
                        }
                        const randomNewAccAddNo = pickRandomNumber(1, 60)
                        nextBlockForNewAcc.pop()
                        nextBlockForNewAcc.push(block + randomNewAccAddNo)
                        const acc = ethers.Wallet.createRandom()
                        const hermesClient = new HermesSdkClient({phrase: acc.mnemonic.phrase, network: Network.DojTestnet});
                        const hermes_address = hermesClient.getAddress();
                        postAccountToDB(acc.mnemonic.phrase, acc.address, hermes_address)
                        axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${acc.address}`).then(() => {
                            // return
                        })
                        axios.post(`https://faucet.h4s.dojima.network/api/v1/H4S/${hermes_address}`).then(() => {
                            return
                        })
                    } else if(nextBlock !== [] && nextBlock[0] === block) {
                        provider.getBlock(block).then(async () => {
                            const res = pickRandomNumber(1, 40)
                            nextBlock.pop()
                            nextBlock.push(block + res)
                            const accounts = await getAccountsFromDB();
                            const sourceRandomArrayIndex = pickRandomNumber(2, accounts.length - 1);
                            const accountData = ethers.Wallet.fromMnemonic(accounts[sourceRandomArrayIndex].mnemonic)
                            const _source = new ethers.Wallet(accountData.privateKey);
                            const source = _source.connect(provider);
                            const sourceBalance = await provider.getBalance(source.address);
                            if (Number(sourceBalance) <= Number(ethers.utils.parseEther('0.005'))) {
                                axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${source.address}`).then(() => {
                                    return
                                })
                                return
                            }
                            const txBuffer = ethers.utils.parseEther(".005");
                            if (Number(sourceBalance.sub(txBuffer)) > 0) {
                                const remainingAmount = sourceBalance.sub(txBuffer);
                                let transferAmount: ethers.ethers.BigNumber;
                                let targetAddress: string
                                if(Number(remainingAmount) >= Number(ethers.utils.parseEther('1.5'))) {
                                    transferAmount = BigNumber.from((Number(remainingAmount)).toFixed())
                                    targetAddress = '0x53c7C9d2CAA6942CdA9A86bd729EA4461Ef5AE40'
                                } else {
                                    const targetRandomArrayIndex = pickRandomNumber(1, accounts.length - 1);
                                    targetAddress = accounts[targetRandomArrayIndex].dojima_address;
                                    const randomPercent = pickRandomNumber(1, 80) / 100
                                    transferAmount = BigNumber.from((Number(remainingAmount) * randomPercent).toFixed())
                                }
                                try {
                                    await source.sendTransaction({
                                        to: targetAddress,
                                        value: transferAmount
                                    });
                                } catch (e) {
                                    const acc = ethers.Wallet.createRandom()
                                    const hermesClient = new HermesSdkClient({phrase: acc.mnemonic.phrase, network: Network.DojTestnet});
                                    const hermes_address = hermesClient.getAddress();
                                    postAccountToDB(acc.mnemonic.phrase, acc.address, hermes_address)
                                    axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${acc.address}`).then(() => {
                                        // return
                                    })
                                    axios.post(`https://faucet.h4s.dojima.network/api/v1/H4S/${hermes_address}`).then(() => {
                                        // return
                                    })
                                    return
                                }
                            }
                        })
                    }
                } else {
                    if (nextBlockForNewAcc.length === 0) {
                        const randomNewAccAddNo = pickRandomNumber(1, 60)
                        nextBlockForNewAcc.push(block + randomNewAccAddNo)
                    }
                    if (nextBlock.length === 0) {
                        const res = pickRandomNumber(1, 10)
                        nextBlock.push(block + res)
                    }
                }
            } catch (e) {
                console.error(e)
            }
        })
    }
    accLoop()
})();

// import * as fs from "fs";
// import * as path from "path";
// import { parse } from 'csv-parse';
// import axios from "axios";
// import * as ethers from "ethers";
// import {BigNumber} from "ethers";
// import {Network} from "../client";
// import {assetAmount, assetToBase, baseToAsset} from "../utils";
// import {DOJ_DECIMAL, HermesSdkClient} from "../hermes";
//
//
// type AddressList = {
//     _id: string;
//     dojimaaddress: string;
//     hermesaddress: string;
//     id: string;
//     mnemonic: string;
//     time: string
// }
//
// function postAccountToDB(mnemonic: string, dojima_address: string, hermes_address: string) {
//     var data = JSON.stringify({
//         "mnemonic": mnemonic,
//         "dojima_address": dojima_address,
//         "hermes_address": hermes_address
//     });
//
//     var config = {
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
//             // console.log(JSON.stringify(response.data));
//             console.log()
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//
// }
//
// (() => {
//     const csvFilePath = path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/accounts_data.csv');
//
//     const headers = ['_id', 'dojimaaddress', 'hermesaddress', 'id', 'mnemonic', 'time'];
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
//         let accountIndex: number = 1599
//         const accLoop = async () => {
//             provider.on('block', (block) => {
//                 if(accountIndex > (result.length - 1)){
//                     throw Error('Balances empty')
//                 }
//                 // console.log('Nxt :: ', nextBlock)
//                 if (nextBlock !== [] && (nextBlock[0] + 1) === block) {
//                     const hermesLoop = async () => {
//                         const accounts = result;
//                         const hermesClient = new HermesSdkClient({
//                             phrase: accounts[accountIndex].mnemonic,
//                             network: Network.DojTestnet
//                         });
//                         const balanceObj = await hermesClient.getBalance(accounts[accountIndex].hermesaddress)
//                         const balance = (baseToAsset(balanceObj[0].amount)).amount();
//                         if ((Number(balance) - 0.02) > 0) {
//                             const remainingAmount = Number(balance) - 0.02;
//                             const targetAddress = 'dojima1glcnqvd7k3s3ktgkjj8apdvls79vwfwglux2yr';
//                             try {
//                                 let amount = assetToBase(assetAmount(remainingAmount, DOJ_DECIMAL ))
//                                 await hermesClient.transfer({
//                                     amount,
//                                     recipient: targetAddress
//                                 });
//                             } catch (e) {
//                             }
//                         }
//                     }
//                     hermesLoop()
//                 }
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
//                             postAccountToDB(result[accountIndex].mnemonic, result[accountIndex].dojimaaddress, result[accountIndex].hermesaddress)
//                             const res = pickRandomNumber(1, 10)
//                             nextBlock.pop()
//                             nextBlock.push(block + res)
//                             // console.log('Nxt :: ', block + res)
//                             const accounts = result ;
//                             const sourceRandomArrayIndex = accountIndex;
//                             const _source = ethers.Wallet.fromMnemonic(accounts[sourceRandomArrayIndex].mnemonic);
//                             const source = _source.connect(provider);
//                             const sourceBalance = await provider.getBalance(source.address);
//                             const txBuffer = ethers.utils.parseEther(".005");
//                             if (Number(sourceBalance.sub(txBuffer)) > 0) {
//                                 const remainingAmount = sourceBalance.sub(txBuffer);
//                                 const transferAmount = BigNumber.from((Number(remainingAmount)).toFixed())
//                                 try {
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
//                 }
//             })
//         }
//         accLoop()
//     });
// })();