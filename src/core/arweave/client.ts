import Arweave from "arweave";
import {ChainClientParams, Network} from "../client";
import {validatePhrase} from "../crypto";
import {getKeyFromMnemonic} from "arweave-mnemonic-keys";
import Transaction, {Tag} from "arweave/node/lib/transaction";
import {
    ArTxDataResult,
    ArTxParams,
    ArTxs,
    ArTxsHistoryParams,
    GasfeeResult,
    TxStatusResponse
} from "./types";
import ArweaveTxClient from "./tx-client";
import {ApiConfig} from "arweave/node/lib/api";
import {AR_DECIMAL, defaultArMainnetConfig, defaultArTestnetConfig} from "./utils";
import {InboundAddressResult, SwapAssetList} from "../utils";
import {
    calcDoubleSwapOutput,
    calcDoubleSwapSlip,
    calcSwapOutput,
    calcSwapSlip,
    PoolData,
    SwapFeeResult
} from "../swap_utils";
import {getPoolData} from "../pool_utils";

export interface ArweaveChainClient {
    getAddress(): Promise<string>,
    mintArTokens(pubAddress: string): Promise<void>
    getBalance(address: string): Promise<number>,
    getFees(rawTx: Transaction): GasfeeResult
    transfer({recipient, amount}: ArTxParams): Promise<string>,
    getTransactionData(txHash: string): Promise<ArTxDataResult>,
    getTransactionsHistory(params: ArTxsHistoryParams): Promise<ArTxs>
    getTxStatus(txHash: string): Promise<TxStatusResponse>
}

export type ChainConfigParams = {
    config?: ApiConfig
}

class ArweaveClient extends ArweaveTxClient implements ArweaveChainClient {
    protected network: Network;
    protected arweave: Arweave;
    protected phrase = '';
    protected apiConfig: ApiConfig
    constructor({
                    phrase,
                    network = Network.Mainnet,
                    config = defaultArMainnetConfig
                }: ChainClientParams & ChainConfigParams) {
        super()
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase')
            }
            this.phrase = phrase
        }
        this.network = network
        this.apiConfig = config
        if ((this.network === Network.Testnet) || (this.network === Network.Stagenet)) {
            this.apiConfig = defaultArTestnetConfig
        }
        if ((this.network === Network.DojTestnet) && this.apiConfig === defaultArMainnetConfig) {
            throw Error(`'config' params can't be empty for 'dojtestnet'`)
        }
        this.arweave = Arweave.init(this.apiConfig)
    }

    async getAddress(): Promise<string> {
        const keyPair = await getKeyFromMnemonic(this.phrase);
        const address = await this.arweave.wallets.jwkToAddress(keyPair);
        return address;
    }

    /** testnet tokens in winston */
    async mintArTokens(address: string) {
        const test_ar_amount = 100000000000000;

        // Mint balance in Arlocal for testing
        await this.arweave.api.get(`/mint/${address}/${test_ar_amount}`);
        await this.arweave.api.get("/mine");
    }

    async getBalance(address: string): Promise<number> {
        /** Get balance */
        let wnstBalance = await this.arweave.wallets.getBalance(address);

        /** Convert balance from Winston to Ar. (1 Ar = 10^12) */
        const arBalance = this.arweave.ar.winstonToAr(wnstBalance);

        return Number(arBalance);
    }

    /** Calculate gasFee required for transaction */
    getFees(rawTx: Transaction): GasfeeResult {
        /**  Gas fee generated by default during 'createTransaction' */
        const arw_gasFee = Number(rawTx.reward);
        return {
            slow: arw_gasFee,
            average: arw_gasFee,
            fast: arw_gasFee,
        }
    }

    /** Create transaction based on user inputs */
    async createTransaction(
        recipient: string,
        amount: number,
        tag?: Tag
    ): Promise<Transaction> {
        const pvtKey = await getKeyFromMnemonic(this.phrase);
        // const pubAddress = await this.arweave.wallets.jwkToAddress(pvtKey);

        // Create transaction
        const rawTx = await this.arweave.createTransaction(
            {
                target: recipient, // Receiver address
                quantity: this.arweave.ar.arToWinston(amount.toString()), // Amount to transfer in Ar
                tags: tag ? [tag] : []
            },
            pvtKey
        );

        return rawTx;
    }

    /** Sign and Send the transaction */
    async signAndSend(rawTx: Transaction): Promise<string> {
        const pvtKey = await getKeyFromMnemonic(this.phrase);
        // const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);

        /** Sign transaction and retrieve status */
        await this.arweave.transactions.sign(rawTx, pvtKey);
        const status = await this.arweave.transactions.post(rawTx);
        await this.arweave.api.get("/mine");

        if (status.status !== 200) throw Error(`Transaction error or invalid`)

        return rawTx.id;
    }

    async transfer({recipient, amount}: ArTxParams): Promise<string> {
        const rawTx = await this.createTransaction(recipient, amount)

        const txHash = await this.signAndSend(rawTx)

        return txHash
    }

    /**  Get status data using transaction hash / id */
    async getTxStatus(txHash: string): Promise<TxStatusResponse> {
        const statusData = await this.arweave.transactions.getStatus(txHash);
        return statusData
    }

    async getTransactionData(txHash: string): Promise<ArTxDataResult> {
        const txData = await this.getTxData(this.arweave, txHash)
        return txData
    }

    async getTransactionsHistory(params: ArTxsHistoryParams): Promise<ArTxs> {
        const txs = await this.getTxsHistory(this.arweave, params.address, params.limit ? params.limit : 100)
        const txsResult = {
            total: txs.inner.length,
            txs
        }
        return txsResult
    }

    async dummyTx(recipient: string, amount: number): Promise<string> {
        const tag = new Tag(
            this.arweave.utils.stringToB64Url('memo'),
            this.arweave.utils.stringToB64Url(`NOOP:NOVAULT`)
        )
        const rawTx = await this.createTransaction(recipient, amount, tag)

        const txHash = await this.signAndSend(rawTx)

        return txHash
    }

    getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean) {
        const input = inputAmount * Math.pow(10, AR_DECIMAL)
        return calcSwapOutput(input, pool, toDoj);
    }

    getDoubleSwapOutput(inputAmount: number, pool1: PoolData, pool2: PoolData) {
        const input = inputAmount * Math.pow(10, AR_DECIMAL)
        return calcDoubleSwapOutput(input, pool1, pool2)
    }

    getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, AR_DECIMAL)
        return calcSwapSlip(input, pool, toDoj);
    }

    getDoubleSwapSlip(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, AR_DECIMAL)
        return calcDoubleSwapSlip(input, pool1, pool2)
    }

    async getSwapFeesData(): Promise<SwapFeeResult> {
        return
    }

    async getInboundObject(): Promise<InboundAddressResult> {
        const response = await this.arweave.api.get('https://api-test.h4s.dojima.network/hermeschain/inbound_addresses')
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
            );
        }

        const data: Array<InboundAddressResult> = response.data;
        const inboundObj: InboundAddressResult = data.find(res => res.chain === 'AR')
        return inboundObj
    }

    async getArweaveInboundAddress(): Promise<string> {
        const inboundObj = await this.getInboundObject()
        return inboundObj.address
    }

    async getDefaultLiquidityPoolGasFee(): Promise<number> {
        const inboundObj = await this.getInboundObject()

        /** Convert from Winston to Ar. (1 Ar = 10^12) */
        const arGasFee = this.arweave.ar.winstonToAr(inboundObj.gas_rate);

        return Number(arGasFee);
    }

    async addLiquidityPool(amount: number, inboundAddress: string, dojAddress?: string): Promise<string> {
        const tag = dojAddress ?
            new Tag(
                this.arweave.utils.stringToB64Url('memo'),
                this.arweave.utils.stringToB64Url(`ADD:AR.AR:${dojAddress}`)
            )
            :
            new Tag(
                this.arweave.utils.stringToB64Url('memo'),
                this.arweave.utils.stringToB64Url(`ADD:AR.AR`)
            )

        const rawTx = await this.createTransaction(inboundAddress, amount, tag)

        const txHash = await this.signAndSend(rawTx)

        return txHash
    }

    async swap(amount: number, token: SwapAssetList, inboundAddress: string, recipient: string): Promise<string> {
        const fromPool = await getPoolData('AR.AR')
        const toPool = await getPoolData(token)
        const swapOutput = this.getDoubleSwapOutput(amount, fromPool, toPool)
        console.log('Swap output : ', swapOutput)
        const tag = new Tag(
            this.arweave.utils.stringToB64Url('memo'),
            this.arweave.utils.stringToB64Url(`SWAP:${token}:${recipient}`)
        )

        const rawTx = await this.createTransaction(inboundAddress, amount, tag)

        const txHash = await this.signAndSend(rawTx)

        return txHash
    }
}

export { ArweaveClient }