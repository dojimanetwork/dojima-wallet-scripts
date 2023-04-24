import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { createObjectCsvWriter } from 'csv-writer';
import axios from "axios";


type AddressList = {
    balance: number;
    wallet: string
}

(() => {
    const csvFilePath = path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/DojimaNetwork-Airdrop.csv');

    const headers = ['balance', 'wallet'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, async (error, result: AddressList[]) => {
        if (error) {
            console.error(error);
        }
        // console.log("Result", result);
        let correctAddr: Array<any> = []
        let fakeAddr: Array<any> = []
        for (var index in result) {
            const responseApi = await axios.get(
                `https://fiber-test.h4s.dojima.network/api/v1/validate/swap_address/${result[index].wallet}`
            );
            if(responseApi.data.status === "success") {
                correctAddr.push({
                    address: `${result[index].wallet} 2,`
                })
            } else {
                fakeAddr.push({
                    address: `${result[index].wallet} 2,`
                })
            }
        }
        const writer = createObjectCsvWriter({
            path: path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/correct.csv'),
            header: [
                { id: 'address', title: 'Wallet Address' },
            ],
        });

        writer.writeRecords(correctAddr).then(() => {
            console.log('Done correct addr : ', correctAddr.length)
        })

        const writer1 = createObjectCsvWriter({
            path: path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/fake.csv'),
            header: [
                { id: 'address', title: 'Wallet Address' },
            ],
        });

        writer1.writeRecords(fakeAddr).then(() => {
            console.log('Done fake addr : ', fakeAddr.length)
        })
        // let correctAddr: Array<AddressList> = []
        // let fakeAddr: Array<AddressList> = []
        // for (var index in result) {
        //     const responseApi = await axios.get(
        //         `https://fiber-test.h4s.dojima.network/api/v1/validate/swap_address/${result[index].wallet}`
        //     );
        //     console.log(responseApi.data.message)
        //     if(responseApi.data.status === "success") {
        //         correctAddr.push({
        //             balance: result[index].balance,
        //             wallet: result[index].wallet
        //         })
        //     } else {
        //         fakeAddr.push({
        //             balance: result[index].balance,
        //             wallet: result[index].wallet
        //         })
        //     }
        // }
        // const writer = createObjectCsvWriter({
        //     path: path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/correct.csv'),
        //     header: [
        //         { id: 'balance', title: 'Balance' },
        //         { id: 'wallet', title: 'Wallet Address' },
        //     ],
        // });
        //
        // writer.writeRecords(correctAddr).then(() => {
        //     console.log('Done correct addr : ', correctAddr.length)
        // })
        //
        // const writer1 = createObjectCsvWriter({
        //     path: path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/fake.csv'),
        //     header: [
        //         { id: 'balance', title: 'Balance' },
        //         { id: 'wallet', title: 'Wallet Address' },
        //     ],
        // });
        //
        // writer1.writeRecords(fakeAddr).then(() => {
        //     console.log('Done fake addr : ', fakeAddr.length)
        // })
    });
})();