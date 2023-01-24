import Web3 from "web3";
import {Network} from "../client";
import * as ethers from "ethers";
import BigNumber from "bignumber.js";
import {EthTransferParams, EthTxData, GasfeeResult} from "./types";
import {ChainClientParams} from "@d11k-ts/client";
import {validatePhrase} from "@d11k-ts/crypto";
import {defaultEthInfuraRpcUrl, defaultInfuraApiKey, ETH_DECIMAL} from "./const";
import {InboundAddressResult, SwapAssetList} from "../utils";
import axios from "axios";

export type EthRpcParams = {
    rpcUrl?: string,
    infuraApiKey?: string,
}

export default class EthChain {
    protected network: Network;
    protected web3: Web3;
    protected rpcUrl: string;
    protected account: ethers.ethers.Wallet;
    protected phrase = "";

    constructor({
                    phrase,
                    network = Network.Mainnet,
                    rpcUrl = defaultEthInfuraRpcUrl,
                    infuraApiKey = defaultInfuraApiKey,
                }: ChainClientParams & EthRpcParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error("Invalid phrase");
            }
            this.phrase = phrase;
        }
        this.network = network;
        if (this.network !== Network.Mainnet && rpcUrl === defaultEthInfuraRpcUrl) {
            throw Error(`'rpcUrl' param can't be empty for 'testnet' or 'stagenet'`);
        }
        if (this.network === Network.Testnet || this.network === Network.Stagenet) {
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
        const gweiBalance = await this.web3.eth.getBalance(address); // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
        const ethBalance = this.web3.utils.fromWei(gweiBalance);
        return Number(ethBalance);
    }

    calculateDojFee(baseGasFee: number, multiplier: number): number {
        return new BigNumber(baseGasFee)
            .times(new BigNumber(multiplier))
            .toNumber();
    }

    async estimateGasFee(amount: number, memo?: string): Promise<number> {
        return await this.web3.eth.estimateGas({
            from: this.getAddress(),
            to: this.getAddress(),
            value: amount * Math.pow(10, ETH_DECIMAL),
            data: memo ? this.web3.utils.toHex(memo) : undefined,
        });
    }

    async getFees(amount: number, memo?: string): Promise<GasfeeResult> {
        const estimateGas = await this.estimateGasFee(
            amount,
            memo ? memo : undefined
        );
        return {
            slow: this.calculateDojFee(estimateGas, 1) / Math.pow(10, 9),
            average: this.calculateDojFee(estimateGas, 1.5) / Math.pow(10, 9),
            fast: this.calculateDojFee(estimateGas, 2) / Math.pow(10, 9),
        };
    }

    async transfer(params: EthTransferParams): Promise<string> {
        const transaction = await this.web3.eth.accounts.signTransaction(
            {
                from: this.getAddress(),
                to: params.recipient,
                value: params.amount * Math.pow(10, ETH_DECIMAL),
                gas: params.fee
                    ? params.fee * Math.pow(10, 9)
                    : await this.estimateGasFee(
                        params.amount,
                        params.memo ? params.memo : undefined
                    ),
                data: params.memo ? this.web3.utils.toHex(params.memo) : undefined,
            },
            this.account.privateKey
        );

        const transactionResult = await this.web3.eth.sendSignedTransaction(
            transaction.rawTransaction as string
        );
        return transactionResult.transactionHash;
    }

    async getTransactionData(hash: string): Promise<EthTxData> {
        const data = await this.web3.eth.getTransaction(hash);
        if (data) {
            return {
                transaction_hash: data.hash,
                from: data.from,
                to: data.to as string,
                amount: Number(data.value) / Math.pow(10, ETH_DECIMAL),
                gasFee: data.gas / Math.pow(10, 9),
                block_number: data.blockNumber as number,
                block_hash: data.blockHash as string,
                gasPrice: data.gasPrice,
                nonce: data.nonce,
            };
        } else {
            throw new Error(`Failed to get transaction data (tx-hash: ${hash})`);
        }
    }

    async getInboundObject(): Promise<InboundAddressResult> {
        const response = await axios.get('https://api-test.h4s.dojima.network/hermeschain/inbound_addresses')
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
            );
        }

        const data: Array<InboundAddressResult> = response.data;
        const inboundObj: InboundAddressResult = data.find(res => res.chain === 'ETH')
        return inboundObj
    }

    async getEthereumInboundAddress(): Promise<string> {
        const inboundObj = await this.getInboundObject()
        return inboundObj.address
    }

    async getDefaultLiquidityPoolGasFee(): Promise<number> {
        const inboundObj = await this.getInboundObject()

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, ETH_DECIMAL);

        return gasFee;
    }

    async addLiquidityPool(amount: number, inboundAddress: string, dojAddress?: string): Promise<string> {
        const memo = dojAddress ?
            `ADD:ETH.ETH:${dojAddress}`
            :
            `ADD:ETH.ETH`

        const txHash = await this.transfer({
            amount,
            recipient: inboundAddress,
            memo
        })

        return txHash
    }

    async swap(amount: number, token: SwapAssetList, inboundAddress: string, recipient: string): Promise<string> {
        const memo = `SWAP:${token}:${recipient}`

        const txHash = await this.transfer({
            amount,
            recipient: inboundAddress,
            memo
        })

        return txHash
    }
}