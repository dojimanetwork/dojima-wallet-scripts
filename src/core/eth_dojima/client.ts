import Web3 from "web3";
import {Network} from "../client";
import * as ethers from "ethers";
import BigNumber from "bignumber.js";

export default class EthChain {
    protected network: Network;
    protected web3: Web3;
    protected rpcUrl: string;
    protected account: ethers.ethers.Wallet;
    constructor(mnemonic: string, network: Network) {
        this.network = network;
        if(this.network === Network.Testnet || this.network === Network.Stagenet) {
            this.rpcUrl = 'https://eth-test.h4s.dojima.network:9545/';
            // this._api = "https://api-ropsten.etherscan.io/api";
            this.web3 = new Web3(this.rpcUrl);
        } else {
            this.rpcUrl = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
            // this._api = "https://api.etherscan.io/api";
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
        }
        this.account = ethers.Wallet.fromMnemonic(mnemonic);
    }

    getAddress() {
        const address = this.account.address;
        return address;
    }

    async getBalance(address: string) {
        const gweiBalance = await this.web3.eth.getBalance(address);
        // console.log('Balance in gwei is : ', gweiBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

        const ethBalance = this.web3.utils.fromWei(gweiBalance);
        // console.log('Balance in Eth is : ', ethBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

        return Number(ethBalance);
    }

    calculateEthFee(baseGasFee: number, multiplier: number): number {
        const fee = new BigNumber(baseGasFee)
            .times(new BigNumber(multiplier))
            .toNumber();
        return fee;
    }

    async getFees() {
        const baseGasFee = await this.web3.eth.getGasPrice();
        const eth_gasFee = {
            slow: this.calculateEthFee(parseFloat(baseGasFee), 1) / Math.pow(10, 18),
            average:
                this.calculateEthFee(parseFloat(baseGasFee), 1.5) / Math.pow(10, 18),
            fast: this.calculateEthFee(parseFloat(baseGasFee), 2) / Math.pow(10, 18),
        };
        return eth_gasFee
    }

    async transfer(recipient: string, amount: number, fee?: number, memo?: string) {
        const transaction = await this.web3.eth.accounts.signTransaction(
            {
                from: this.getAddress(),
                to: recipient,
                value: amount * Math.pow(10, 18),
                gas: 21000,
                data: memo ? memo : undefined
            },
            this.account.privateKey
        );

        const transactionResult = await this.web3.eth.sendSignedTransaction(
            transaction.rawTransaction
        );
        return transactionResult.transactionHash;
    }

    async getTransactionData(hash: string) {
        const dataTx = await this.web3.eth.getTransaction(hash);
        console.log(dataTx)
        const data = await this.web3.eth.getTransactionReceipt(hash);
        console.log(data)
    }
}