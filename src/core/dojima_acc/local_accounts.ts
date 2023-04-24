import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
// import axios from "axios";
import * as ethers from "ethers";
import {BigNumber} from "ethers";


type AddressList = {
    address: string;
    private_key: string
}

(() => {
    const csvFilePath = path.resolve(__dirname, '/Users/udaybhanuprasad/Desktop/dojima_add.csv');

    const headers = ['address', 'private_key'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, async (error, result: AddressList[]) => {
        if (error) {
            console.error(error);
        }
        const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network:8545/');
        const pickRandomNumber = (min: number, max: number): number => {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        let nextBlock: Array<any> = []
        let accountIndex: number = 32140
        const accLoop = async () => {
            provider.on('block', (block) => {
                if(accountIndex > (result.length - 1)){
                    throw Error('Balances empty')
                }
                // console.log('Nxt :: ', nextBlock)
                if (
                    nextBlock !== [] && nextBlock[0] < block
                ) {
                    // console.log('Nxt less :: ', nextBlock, ' < :: ', block)
                    if(nextBlock !== [] && nextBlock[0] < block){
                        // console.log('Nxt less :: ', nextBlock, ' < :: ', block)
                        console.log('Index : ', accountIndex)
                        const res = pickRandomNumber(1, 40)
                        nextBlock.pop()
                        nextBlock.push(block + res)
                        // console.log('Nxt less :: ', block + res)
                        return
                    }
                }
                try {
                    if (
                        nextBlock !== [] && nextBlock[0] === block
                    ) {
                        provider.getBlock(block).then(async () => {
                                const res = pickRandomNumber(1, 10)
                                nextBlock.pop()
                                nextBlock.push(block + res)
                                // console.log('Nxt :: ', block + res)
                                const accounts = result ;
                                const sourceRandomArrayIndex = accountIndex;
                                const _source = new ethers.Wallet(accounts[sourceRandomArrayIndex].private_key);
                                const source = _source.connect(provider);
                                const sourceBalance = await provider.getBalance(source.address);
                            console.log(sourceBalance)
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

                    } else {
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
    });
})();