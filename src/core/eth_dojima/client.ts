import Web3 from "web3";
import {Network} from "../client";
import * as ethers from "ethers";
import BigNumber from "bignumber.js";
import {EthTransferParams, EthTxData, GasfeeResult} from "./types";
import {ChainClientParams} from "@d11k-ts/client";
import {validatePhrase} from "@d11k-ts/crypto";
import {defaultEthInfuraRpcUrl, defaultInfuraApiKey} from "./const";
import {Transaction} from "web3-eth";

export type EthRpcParams = {
    rpcUrl?: string,
    infuraApiKey?: string,
}

export default class EthChain {
    protected network: Network;
    protected web3: Web3;
    protected rpcUrl: string;
    protected account: ethers.ethers.Wallet;
    protected phrase = ''

    constructor({
                    phrase,
                    network = Network.Mainnet,
                    rpcUrl = defaultEthInfuraRpcUrl,
                    infuraApiKey = defaultInfuraApiKey
                }: ChainClientParams & EthRpcParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase')
            }
            this.phrase = phrase
        }
        this.network = network;
        if ((this.network !== Network.Mainnet) && rpcUrl === defaultEthInfuraRpcUrl) {
            throw Error(`'rpcUrl' param can't be empty for 'testnet' or 'stagenet'`)
        }
        if(this.network === Network.Testnet || this.network === Network.Stagenet) {
            this.rpcUrl = rpcUrl;
            this.web3 = new Web3(this.rpcUrl);
        } else {
            this.rpcUrl = `${rpcUrl}${infuraApiKey}`;
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
        }
        this.account = ethers.Wallet.fromMnemonic(this.phrase);
    }

    getAddress(): string {
        return this.account.address;
    }

    async getBalance(address: string): Promise<number> {
        const gweiBalance = await this.web3.eth.getBalance(address);    // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
        const ethBalance = this.web3.utils.fromWei(gweiBalance);
        return Number(ethBalance);
    }

    calculateDojFee(baseGasFee: number, multiplier: number): number {
        return (new BigNumber(baseGasFee)
            .times(new BigNumber(multiplier))
            .toNumber());
    }

    async estimateGasFee(amount: number, memo?: string): Promise<number> {
        return await this.web3.eth.estimateGas({
            from: this.getAddress(),
            to: this.getAddress(),
            value: amount * Math.pow(10, 18),
            data: memo ? this.web3.utils.toHex(memo) : undefined
        });
    }

    async getFees(amount: number, memo?: string): Promise<GasfeeResult> {
        const estimateGas = await this.estimateGasFee(amount, memo ? memo : undefined)
        return {
            slow: this.calculateDojFee(estimateGas, 1) / Math.pow(10, 9),
            average: this.calculateDojFee(estimateGas, 1.5) / Math.pow(10, 9),
            fast: this.calculateDojFee(estimateGas, 2) / Math.pow(10, 9),
        };
        // const baseGasFee = await this.web3.eth.getGasPrice();
        // const eth_gasFee = {
        //     slow: this.calculateDojFee(parseFloat(baseGasFee), 1) / Math.pow(10, 18),
        //     average: this.calculateDojFee(parseFloat(baseGasFee), 1.5) / Math.pow(10, 18),
        //     fast: this.calculateDojFee(parseFloat(baseGasFee), 2) / Math.pow(10, 18),
        // };
    }

    async transfer(params: EthTransferParams): Promise<string> {
        const transaction = await this.web3.eth.accounts.signTransaction(
            {
                from: this.getAddress(),
                to: params.recipient,
                value: params.amount * Math.pow(10, 18),
                gas: params.fee ? params.fee * Math.pow(10, 9) : await this.estimateGasFee(params.amount, params.memo ? params.memo : undefined),
                data: params.memo ? this.web3.utils.toHex(params.memo) : undefined
            },
            this.account.privateKey
        );

        const transactionResult = await this.web3.eth.sendSignedTransaction(
            transaction.rawTransaction
        );
        return transactionResult.transactionHash;
    }

    async getTransactionData(hash: string): Promise<EthTxData> {
        const data: Transaction = await this.web3.eth.getTransaction(hash);
        if(data) {
            return {
                transaction_hash: data.hash,
                from: data.from,
                to: data.to,
                amount: Number(data.value) / Math.pow(10, 18),
                gasFee: data.gas / Math.pow(10, 9),
                block_number: data.blockNumber,
                block_hash: data.blockHash,
                gasPrice: data.gasPrice,
                nonce: data.nonce
            }
        } else {
            throw new Error(`Failed to get transaction data (tx-hash: ${hash})`)
        }
        // const data = await this.web3.eth.getTransactionReceipt(hash);
        // return data
    }
}