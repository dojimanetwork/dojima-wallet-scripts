import axios from 'axios';
import { ethers } from 'ethers';
import {AccountsDataResult, AccountsResult} from "./client";

const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network/');
const targetAddress = '0x53c7C9d2CAA6942CdA9A86bd729EA4461Ef5AE40';

async function getAccountsFromDB(): Promise<AccountsDataResult[]> {
    const res = await axios.get('https://fiber-test.h4s.dojima.network/api/v1/all_accounts')
    const dataRes: AccountsResult = res.data
    return dataRes.data
}

let nextBlock = 0;
export async function processTransactions(accounts: AccountsDataResult[]) {
    try {
        // Read the current block height from the provider
        const currentBlock = await provider.getBlockNumber();
        // Pick any random block height which is (1-40) more from the current block and store it.
        // nextBlock = currentBlock + Math.floor(Math.random() * 40) + 1;

        // If the block height is not the same as "nextBlock", skip the process
        if (currentBlock > nextBlock) {
            nextBlock = currentBlock + Math.floor(Math.random() * 40) + 1;
            console.log('Skipping process. Block height does not match nextBlock.');
            await processTransactions(accounts);
            // return;
        }

        // Perform the process for the updated "nextBlock"
        if (currentBlock === nextBlock) {
            nextBlock = currentBlock + Math.floor(Math.random() * 40) + 1;
            // Get any random account from "accounts" and read mnemonic value.
            const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
            const accountData = ethers.Wallet.fromMnemonic(randomAccount.mnemonic);
            const source = new ethers.Wallet(accountData.privateKey).connect(provider);

            // Read balance of the selected account using mnemonic.
            const balance = await provider.getBalance(source.address);

            // If balance is greater than 1, send the entire balance (as transferAmount) to targetAddress
            if (balance.gt(ethers.utils.parseEther('1.0'))) {
                await source.sendTransaction({
                    to: targetAddress,
                    value: balance
                });
                console.log('Transfer if successful.');
                await processTransactions(accounts);
            }
            // If balance is less than 0.005, perform d11kFaucet with the account address
            else if (balance.lt(ethers.utils.parseEther('0.005'))) {
                await d11kFaucet(source.address);
            }
            // If balance is between 0.005 and 1, get a random percentage (50-80%) and transfer to targetAddress
            else {
                const randomPercentage = Math.floor(Math.random() * 31) + 50;
                const transferAmount = balance.mul(randomPercentage).div(100);
                await source.sendTransaction({
                    to: targetAddress,
                    value: transferAmount
                });
                console.log('Transfer else successful.');
                await processTransactions(accounts);
            }
        } else {
            await processTransactions(accounts);
        }
    } catch (error) {
        console.error('Error in the processTransactions function:', error);
        // If there is any error in the above process, perform the entire function again
        const currentBlock = await provider.getBlockNumber();
        nextBlock = currentBlock + Math.floor(Math.random() * 40) + 1;
        await processTransactions(accounts);
    }
}

async function d11kFaucet(address: string) {
    const accounts = await getAccountsFromDB();
    try {
        await axios.post(`https://faucet.h4s.dojima.network/api/v1/D11K/${address}`);
        console.log('Faucet request successful.');
        nextBlock = nextBlock + Math.floor(Math.random() * 50) + 1;
        await processTransactions(accounts);
    } catch (error) {
        console.error('Error in d11kFaucet function:', error);
        // If there is any error in the faucet request, perform the entire function again
        await processTransactions(accounts);
    }
}

(async () => {
    const accounts = await getAccountsFromDB();
    await processTransactions(accounts);
})()
