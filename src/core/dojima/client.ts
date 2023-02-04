import Web3 from "web3";
import {ChainClientParams, Network} from "../client";
import * as ethers from "ethers";
import BigNumber from "bignumber.js";
import {DojTransferParams, DojTxData, GasfeeResult} from "./types";
import {validatePhrase} from "../crypto";
import {defaultDojInfuraRpcUrl, defaultInfuraApiKey} from "./const";

export type DojRpcParams = {
    rpcUrl?: string,
    infuraApiKey?: string,
}

export default class DojimaChain {
    protected network: Network;
    protected web3: Web3;
    protected rpcUrl: string;
    protected account: ethers.ethers.Wallet;
    protected phrase = ''

    constructor({
                    phrase,
                    network = Network.Mainnet,
                    rpcUrl = defaultDojInfuraRpcUrl,
                    infuraApiKey = defaultInfuraApiKey,
                }: ChainClientParams & DojRpcParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase')
            }
            this.phrase = phrase
        }
        this.network = network;
        if ((this.network !== Network.Mainnet) && rpcUrl === defaultDojInfuraRpcUrl) {
            throw Error(`'rpcUrl' param can't be empty for 'testnet' or 'stagenet'`)
        }
        if(this.network === Network.Mainnet) {
            this.rpcUrl = `${rpcUrl}${infuraApiKey}`;
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
        } else {
            this.rpcUrl = rpcUrl;
            this.web3 = new Web3(this.rpcUrl);
        }
        this.account = ethers.Wallet.fromMnemonic(this.phrase);
    }

    getAddress(): string {
        return this.account.address;
    }

    async getBalance(address: string): Promise<number> {
        const gweiBalance = await this.web3.eth.getBalance(address);    // Results balance in gwei, 1 doj = 10^9 gwei(1,000,000,000)
        const dojBalance = this.web3.utils.fromWei(gweiBalance);
        return Number(dojBalance);
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
        // const doj_gasFee = {
        //     slow: this.calculateDojFee(parseFloat(baseGasFee), 1) / Math.pow(10, 18),
        //     average: this.calculateDojFee(parseFloat(baseGasFee), 1.5) / Math.pow(10, 18),
        //     fast: this.calculateDojFee(parseFloat(baseGasFee), 2) / Math.pow(10, 18),
        // };
    }

    async transfer(params: DojTransferParams): Promise<string> {
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

    async getTransactionData(hash: string): Promise<DojTxData> {
        console.log(
            (await this.estimateGasFee(0.01, undefined) * 2)
        )
        const data = await this.web3.eth.getTransaction(hash);
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