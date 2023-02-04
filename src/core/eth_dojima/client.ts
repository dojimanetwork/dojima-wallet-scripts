import Web3 from "web3";
import {ChainClientParams, Network} from "../client";
import * as ethers from "ethers";
import BigNumber from "bignumber.js";
import {
    EthTransferParams,
    EthTxData,
    EthTxDetailsResult,
    EthTxHistoryParams,
    EthTxs,
    GasfeeResult,
    TransactionHistoryResult
} from "./types";
import {validatePhrase} from "../crypto";
import {defaultEthInfuraRpcUrl, defaultInfuraApiKey, ETH_DECIMAL} from "./const";
import {InboundAddressResult, SwapAssetList} from "../utils";
import axios from "axios";
import moment from "moment";

export type EthRpcParams = {
    rpcUrl?: string,
    infuraApiKey?: string,
}

export default class EthereumChain {
    protected network: Network;
    protected web3: Web3;
    protected rpcUrl: string;
    protected account: ethers.ethers.Wallet;
    protected phrase = "";
    protected api = "";

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
        if (this.network === Network.DojTestnet && rpcUrl === defaultEthInfuraRpcUrl) {
            throw Error(`'rpcUrl' param can't be empty for 'doj-testnet'`);
        }
        if ((this.network === Network.Testnet || this.network === Network.Stagenet) && rpcUrl === defaultEthInfuraRpcUrl) {
            throw Error(`'rpcUrl/infuraKey' param can't be empty for 'testnet' or 'stagenet'`);
        }
        if(this.network === Network.DojTestnet) {
            this.rpcUrl = rpcUrl;
            this.web3 = new Web3(this.rpcUrl);
        } else {
            this.rpcUrl = `${rpcUrl}${infuraApiKey}`;
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
        }
        this.account = ethers.Wallet.fromMnemonic(this.phrase);
        if(this.network === Network.Testnet || this.network === Network.Stagenet)
            this.api = 'https://api-goerli.etherscan.io/api'
        else
            this.api = 'https://api.etherscan.io/api'
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

    async getTransactionsHistory(params: EthTxHistoryParams) {
        if(this.network === Network.DojTestnet)
            return null
        else {
            let requestUrl = `${this.api}?module=account&action=txlist`;

            if (params.address)
                requestUrl += `&address=${params.address}`;
            if (params.apiKey)
                requestUrl += `&api=${params.apiKey}`;
            if (params.limit)
                requestUrl += `&offset=${params.limit}`;
            else
                requestUrl += `&offset=10`;
            if (params.page)
                requestUrl += `&page=${params.page}`;
            else
                requestUrl += `&page=1`;
            if (params.sort)
                requestUrl += `&sort=${params.sort}`;
            else
                requestUrl += `&sort=desc`;
            if (params.startBlock)
                requestUrl += `&startblock=${params.startBlock}`;
            else
                requestUrl += `&startblock=0`;
            if (params.endBlock)
                requestUrl += `&endblock=${params.endBlock}`;
            else
                requestUrl += `&endblock=99999999`;
            const convertTimestampToDate = (timestamp: number) => {
                const date = moment(timestamp).toDate().toUTCString();
                return date;
            }

            const convertISOtoUTC = (date: string) => {
                const utcDate = new Date(date).toUTCString();
                return utcDate;
            }

            try {
                let response: TransactionHistoryResult = await (
                    await axios.get(requestUrl)
                ).data;
                if (response.status === "1") {
                    let result: EthTxDetailsResult[] = response.result;
                    if (result !== undefined) {
                        const resultTxs: EthTxs = {
                            total: result.length,
                            txs: result.map((res) => ({
                                block: Number(res.blockNumber),
                                date: moment(
                                    convertISOtoUTC(
                                        convertTimestampToDate(Number(res.timeStamp) * 1000)
                                    )
                                ).format("DD/MM/YYYY"),
                                time: moment(
                                    convertISOtoUTC(
                                        convertTimestampToDate(Number(res.timeStamp) * 1000)
                                    )
                                ).format("HH:mm:ss"),
                                transaction_hash: res.hash,
                                contract_address:
                                    res.contractAddress !== "" ? res.contractAddress : "NA",
                                value: Number(res.value) / Math.pow(10, 18),
                                gas_price: (Number(res.gasPrice) / Math.pow(10, 18)).toFixed(18),
                                from: res.from,
                                to: res.to,
                                transaction_type:
                                    res.from === params.address.toLowerCase()
                                        ? "Send | ETH"
                                        : "Receive | ETH",
                            })),
                        };
                        return resultTxs;
                    } else {
                        return {
                            total: 0,
                            txs: []
                        }
                    }
                } else {
                    return null;
                }
            } catch (error) {
                throw Error("Something went wrong");
            }
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