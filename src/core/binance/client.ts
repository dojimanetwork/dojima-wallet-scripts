import { BncClient } from '@binance-chain/javascript-sdk/lib/client'
import * as crypto from '@binance-chain/javascript-sdk/lib/crypto'
import { SignedSend } from '@binance-chain/javascript-sdk/lib/types'
import {
    Balance,
    BaseChainClient,
    ChainClient,
    ChainClientParams,
    Fees,
    FeeType,
    Network,
    singleFee,
    Tx,
    TxHash,
    TxHistoryParams,
    TxParams,
    TxsPage,
} from '../client'
import {
    Address,
    Asset, assetAmount,
    AssetBNB,
    assetFromString,
    assetToBase, assetToString,
    BaseAmount,
    baseAmount,
    baseToAsset,
    Chain, InboundAddressResult, SwapAssetList,
} from '../utils'
import axios from 'axios'

import {
    Account,
    Balance as BinanceBalance,
    Fees as BinanceFees,
    TransactionResult,
    TransferFee,
    TxPage as BinanceTxPage,
} from './types/binance'
import {getPrefix, isAccount, isTransferFee, parseTx} from './util'
import {BnbDojTestnetClient} from "./doj-testnet";
import {BNB_DECIMAL} from "./types";
import {
    calcDoubleSwapOutput,
    calcDoubleSwapSlip,
    calcSwapOutput,
    calcSwapSlip,
    PoolData,
    SwapFeeResult
} from "../swap_utils";
import {getPoolData} from "../pool_utils";

type PrivKey = string

export type Coin = {
    asset: Asset
    amount: BaseAmount
}

export type MultiTransfer = {
    to: Address
    coins: Coin[]
}

export type MultiSendParams = {
    walletIndex?: number
    transactions: MultiTransfer[]
    memo?: string
}

export type DojBnbClientParams = {
    dojClientUrl?: string
}

/**
 * Interface for custom Binance client
 */
export interface BinanceClient {
    purgeClient(): void
    getBncClient(): BncClient

    getAccount(address?: Address, index?: number): Promise<Account>

    getMultiSendFees(): Promise<Fees>
    getSingleAndMultiFees(): Promise<{ single: Fees; multi: Fees }>

    multiSend(params: MultiSendParams): Promise<TxHash>
}

/**
 * Custom Binance client
 */
class BinanceBeaconClient extends BaseChainClient implements BinanceClient, ChainClient {
    private bncClient: BncClient
    protected dojTestnetUrl = "";
    /**
     * Constructor
     *
     * Client has to be initialised with network type and phrase.
     * It will throw an error if an invalid phrase has been passed.
     *
     * @param {ChainClientParams} params
     *
     * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
     */
    constructor({
                    network = Network.Mainnet,
                    phrase,
                    rootDerivationPaths = {
                        [Network.Mainnet]: "44'/931'/0'/0/",
                        [Network.Stagenet]: "44'/931'/0'/0/",
                        [Network.Testnet]: "44'/931'/0'/0/",
                        [Network.DojTestnet]: "44'/931'/0'/0/",
                    },
                    dojClientUrl = ''
                }: ChainClientParams & DojBnbClientParams) {
        super(Chain.Binance, { network, rootDerivationPaths, phrase })
        this.bncClient = new BncClient(this.getClientUrl())
        this.bncClient.chooseNetwork(this.getNetwork())
        if ((network === Network.DojTestnet) && (dojClientUrl === '')) {
            throw Error(`'dojClientUrl' params can't be empty for 'dojtestnet'`)
        }
        if(network === Network.DojTestnet) {
            this.dojTestnetUrl = dojClientUrl
        }
    }

    /**
     * Get the BncClient interface.
     *
     * @returns {BncClient} The BncClient from `@binance-chain/javascript-sdk`.
     */
    getBncClient(): BncClient {
        return this.bncClient
    }

    /**
     * Gets the current network, and enforces type limited to
     * 'mainnet' and 'testnet', which conflicts with `chain-client`
     *
     * Remove this once @binance-chain has stagenet support.
     * @returns {Network}
     */
    getNetwork(): Network.Mainnet | Network.Testnet  {
        switch (super.getNetwork()) {
            case Network.Mainnet:
            case Network.Stagenet:
                return Network.Mainnet
            case Network.Testnet:
            case Network.DojTestnet:
                return Network.Testnet
        }
    }

    /**
     * Set/update the current network.
     *
     * @param {Network} network
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork(network: Network.Mainnet | Network.Testnet): void {
        super.setNetwork(network)
        this.bncClient = new BncClient(this.getClientUrl())
        this.bncClient.chooseNetwork(network)
    }

    /**
     * Get the client url.
     *
     * @returns {string} The client url for binance chain based on the network.
     */
    private getClientUrl(): string {
        switch (this.getNetwork()) {
            case Network.Mainnet:
                return 'https://dex.binance.org'
            case Network.Testnet:
                return 'https://testnet-dex.binance.org'
        }
    }

    /**
     * Get the explorer url.
     *
     * @returns {string} The explorer url based on the network.
     */
    getExplorerUrl(): string {
        switch (this.getNetwork()) {
            case Network.Mainnet:
                return 'https://explorer.binance.org'
            case Network.Testnet:
                return 'https://testnet-explorer.binance.org'
        }
    }

    /**
     * Get the explorer url for the given address.
     *
     * @param {Address} address
     * @returns {string} The explorer url for the given address based on the network.
     */
    getExplorerAddressUrl(address: Address): string {
        return `${this.getExplorerUrl()}/address/${address}`
    }

    /**
     * Get the explorer url for the given transaction id.
     *
     * @param {string} txID
     * @returns {string} The explorer url for the given transaction id based on the network.
     */
    getExplorerTxUrl(txID: string): string {
        return `${this.getExplorerUrl()}/tx/${txID}`
    }

    /**
     * @private
     * Get private key.
     *
     * @param {number} index account index for the derivation path
     * @returns {PrivKey} The privkey generated from the given phrase
     *
     * @throws {"Phrase not set"}
     * Throws an error if phrase has not been set before
     * */
    private getPrivateKey(index: number): PrivKey {
        if (!this.phrase) throw new Error('Phrase not set')

        return crypto.getPrivateKeyFromMnemonic(this.phrase, true, index)
    }

    /**
     * Get the current address.
     *
     * @param {number} index (optional) Account index for the derivation path
     * @returns {Address} The current address.
     *
     * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    getAddress(index = 0): string {
        return crypto.getAddressFromPrivateKey(this.getPrivateKey(index), getPrefix(this.network))
    }
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress(address: Address): boolean {
        return this.bncClient.checkAddress(address, getPrefix(this.network))
    }

    /**
     * Get account data of wallets or by given address.
     *
     * @param {Address} address (optional) By default, it will return account data of current wallet.
     * @param {number} index (optional) Account index for the derivation path
     *
     * @returns {Account} account details of given address.
     */
    async getAccount(address?: Address, index = 0): Promise<Account> {
        const accountAddress = address || this.getAddress(index)
        const response = await this.bncClient.getAccount(accountAddress)
        if (!response || !response.result || !isAccount(response.result))
            return Promise.reject(Error(`Could not get account data for address ${accountAddress}`))

        return response.result
    }

    /**
     * Get the balance of a given address.
     *
     * @param {Address} address By default, it will return the balance of the current wallet. (optional)
     * @param {Asset} asset If not set, it will return all assets available. (optional)
     * @returns {Balance[]} The balance of the address.
     */
    async getBalance(address: Address, assets?: Asset[]): Promise<Balance[]> {
        if(this.network === Network.DojTestnet) {
            const dojTestnetInst = new BnbDojTestnetClient(`${this.dojTestnetUrl}`)
            const balance = await dojTestnetInst.getBalance(address)
            return [{
                asset: AssetBNB,
                amount: assetToBase(assetAmount(balance.toString(), BNB_DECIMAL)),
            }]
        } else {
            const balances: BinanceBalance[] = await this.bncClient.getBalance(address)

            return balances
                .map((balance) => {
                    return {
                        asset: assetFromString(`${Chain.Binance}.${balance.symbol}`) || AssetBNB,
                        amount: assetToBase(assetAmount(balance.free, BNB_DECIMAL)),
                    }
                })
                .filter(
                    (balance) => !assets || assets.filter((asset) => assetToString(balance.asset) === assetToString(asset)).length,
                )
        }
    }

    /**
     * @private
     * Search transactions with parameters.
     *
     * @returns {Params} The parameters to be used for transaction search.
     * */
    private async searchTransactions(params?: { [x: string]: string | undefined }): Promise<TxsPage> {
        const clientUrl = `${this.getClientUrl()}/api/v1/transactions`
        const url = new URL(clientUrl)

        const endTime = Date.now()
        const diffTime = 90 * 24 * 60 * 60 * 1000
        url.searchParams.set('endTime', endTime.toString())
        url.searchParams.set('startTime', (endTime - diffTime).toString())

        for (const key in params) {
            const value = params[key]
            if (value) {
                url.searchParams.set(key, value)
                if (key === 'startTime' && !params['endTime']) {
                    url.searchParams.set('endTime', (parseInt(value) + diffTime).toString())
                }
                if (key === 'endTime' && !params['startTime']) {
                    url.searchParams.set('startTime', (parseInt(value) - diffTime).toString())
                }
            }
        }

        const txHistory = (await axios.get<BinanceTxPage>(url.toString())).data

        return {
            total: txHistory.total,
            txs: txHistory.tx.map(parseTx).filter(Boolean) as Tx[],
        }
    }

    /**
     * Get transaction history of a given address with pagination options.
     * By default it will return the transaction history of the current wallet.
     *
     * @param {TxHistoryParams} params The options to get transaction history. (optional)
     * @returns {TxsPage} The transaction history.
     */
    async getTransactions(params?: TxHistoryParams): Promise<TxsPage> {
        return await this.searchTransactions({
            address: params && params.address,
            limit: params && params.limit?.toString(),
            offset: params && params.offset?.toString(),
            startTime: params && params.startTime && params.startTime.getTime().toString(),
            txAsset: params && params.asset,
        })
    }

    /**
     * Get the transaction details of a given transaction id.
     *
     * @param {string} txId The transaction id.
     * @returns {Tx} The transaction details of the given transaction id.
     */
    async getTransactionData(txId: string): Promise<Tx> {
        const txResult: TransactionResult = (await axios.get(`${this.getClientUrl()}/api/v1/tx/${txId}?format=json`)).data
        const blockHeight = txResult.height

        let address = ''
        const msgs = txResult.tx.value.msg
        if (msgs.length) {
            const msg = msgs[0].value as SignedSend
            if (msg.inputs && msg.inputs.length) {
                address = msg.inputs[0].address
            } else if (msg.outputs && msg.outputs.length) {
                address = msg.outputs[0].address
            }
        }

        const txHistory = await this.searchTransactions({ address, blockHeight })
        const [transaction] = txHistory.txs.filter((tx) => tx.hash === txId)

        if (!transaction) {
            throw new Error('transaction not found')
        }

        return transaction
    }

    /**
     * Broadcast multi-send transaction.
     *
     * @param {MultiSendParams} params The multi-send transfer options.
     * @returns {TxHash} The transaction hash.
     */
    async multiSend({ walletIndex = 0, transactions, memo = '' }: MultiSendParams): Promise<TxHash> {
        const derivedAddress = this.getAddress(walletIndex)

        await this.bncClient.initChain()
        await this.bncClient.setPrivateKey(this.getPrivateKey(walletIndex))

        const transferResult = await this.bncClient.multiSend(
            derivedAddress,
            transactions.map((transaction) => {
                return {
                    to: transaction.to,
                    coins: transaction.coins.map((coin) => {
                        return {
                            denom: coin.asset.symbol,
                            amount: baseToAsset(coin.amount).amount().toString(),
                        }
                    }),
                }
            }),
            memo,
        )

        return transferResult.result.map((txResult: { hash?: TxHash }) => txResult?.hash ?? '')[0]
    }

    /**
     * Transfer balances.
     *
     * @param {TxParams} params The transfer options.
     * @returns {TxHash} The transaction hash.
     */
    async transfer({ walletIndex, asset, amount, recipient, memo }: TxParams): Promise<TxHash> {
        if(this.network === Network.DojTestnet) {
            const dojTestnetInst = new BnbDojTestnetClient(`${this.dojTestnetUrl}`)
            return await dojTestnetInst.transfer(
                recipient,
                baseToAsset(amount).amount().toNumber(),
                this.getAddress(),
                memo
            )
        } else {
            await this.bncClient.initChain()
            await this.bncClient.setPrivateKey(this.getPrivateKey(walletIndex || 0))

            const transferResult = await this.bncClient.transfer(
                this.getAddress(walletIndex),
                recipient,
                baseToAsset(amount).amount().toString(),
                asset ? asset.symbol : AssetBNB.symbol,
                memo,
            )

            return transferResult.result.map((txResult: { hash?: TxHash }) => txResult?.hash ?? '')[0]
        }
    }

    /**
     * Get the current transfer fee.
     *
     * @returns {TransferFee} The current transfer fee.
     */
    private async getTransferFee(): Promise<TransferFee> {
        const feesArray = (await axios.get<BinanceFees>(`${this.getClientUrl()}/api/v1/fees`)).data

        const [transferFee] = feesArray.filter(isTransferFee)
        if (!transferFee) throw new Error('failed to get transfer fees')

        return transferFee
    }

    /**
     * Get the current fee.
     *
     * @returns {Fees} The current fee.
     */
    async getFees(): Promise<Fees> {
        if(this.network === Network.DojTestnet) {
            const fee = baseAmount(0)

            return {
                type: 'base' as FeeType,
                average: fee,
                fast: fee,
                fastest: fee,
            } as Fees
        } else {
            let singleTxFee: BaseAmount | undefined = undefined
            try {
                singleTxFee = baseAmount(await this.getFeeRateFromHermeschain())
            } catch (error) {
                console.log(error)
                console.warn(`Error pulling rates from hermeschain, will try alternate`)
            }
            if (!singleTxFee) {
                const transferFee = await this.getTransferFee()
                singleTxFee = baseAmount(transferFee.fixed_fee_params.fee)
            }

            return singleFee(FeeType.FlatFee, singleTxFee)
        }
    }

    /**
     * Get the current fee for multi-send transaction.
     *
     * @returns {Fees} The current fee for multi-send transaction.
     */
    async getMultiSendFees(): Promise<Fees> {
        if(this.network === Network.DojTestnet) {
            const fee = baseAmount(0)

            return {
                type: 'base' as FeeType,
                average: fee,
                fast: fee,
                fastest: fee,
            } as Fees
        } else {
            const transferFee = await this.getTransferFee()
            const multiTxFee = baseAmount(transferFee.multi_transfer_fee)

            return {
                type: 'base' as FeeType,
                average: multiTxFee,
                fast: multiTxFee,
                fastest: multiTxFee,
            } as Fees
        }
    }

    /**
     * Get the current fee for both single and multi-send transaction.
     *
     * @returns {SingleAndMultiFees} The current fee for both single and multi-send transaction.
     */
    async getSingleAndMultiFees(): Promise<{ single: Fees; multi: Fees }> {
        if(this.network === Network.DojTestnet) {
            const fee = baseAmount(0)
            return {
                single: {
                    type: 'base' as FeeType,
                    fast: fee,
                    fastest: fee,
                    average: fee,
                } as Fees,
                multi: {
                    type: 'base' as FeeType,
                    average: fee,
                    fast: fee,
                    fastest: fee,
                } as Fees,
            }
        } else {
            const transferFee = await this.getTransferFee()
            const singleTxFee = baseAmount(transferFee.fixed_fee_params.fee)
            const multiTxFee = baseAmount(transferFee.multi_transfer_fee)

            return {
                single: {
                    type: 'base' as FeeType,
                    fast: singleTxFee,
                    fastest: singleTxFee,
                    average: singleTxFee,
                } as Fees,
                multi: {
                    type: 'base' as FeeType,
                    average: multiTxFee,
                    fast: multiTxFee,
                    fastest: multiTxFee,
                } as Fees,
            }
        }
    }

    getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, BNB_DECIMAL)
        return calcSwapOutput(input, pool, toDoj);
    }

    getDoubleSwapOutput(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, BNB_DECIMAL)
        return calcDoubleSwapOutput(input, pool1, pool2)
    }

    getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, BNB_DECIMAL)
        return calcSwapSlip(input, pool, toDoj);
    }

    getDoubleSwapSlip(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, BNB_DECIMAL)
        return calcDoubleSwapSlip(input, pool1, pool2)
    }

    async getSwapFeesData(): Promise<SwapFeeResult> {
        return
    }

    async getInboundObject(): Promise<InboundAddressResult> {
        const response = await axios.get('https://api-test.h4s.dojima.network/hermeschain/inbound_addresses')
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
            );
        }

        const data: Array<InboundAddressResult> = response.data;
        const inboundObj: InboundAddressResult = data.find(res => res.chain === 'BNB')
        return inboundObj
    }

    async getBinanceInboundAddress(): Promise<string> {
        const inboundObj = await this.getInboundObject()
        return inboundObj.address
    }

    async getDefaultLiquidityPoolGasFee(): Promise<number> {
        const inboundObj = await this.getInboundObject()

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, BNB_DECIMAL);

        return gasFee;
    }

    async poolAddOrSwap(amount: number, inboundAddress: string, memo: string): Promise<string> {
        if(this.network === Network.DojTestnet) {
            const dojTestnetInst = new BnbDojTestnetClient(`${this.dojTestnetUrl}`)
            return await dojTestnetInst.transfer(
                inboundAddress,
                amount,
                this.getAddress(),
                memo
            )
        } else {
            await this.bncClient.initChain()
            await this.bncClient.setPrivateKey(this.getPrivateKey( 0))

            const transferResult = await this.bncClient.transfer(
                this.getAddress(),
                inboundAddress,
                amount.toString(),
                AssetBNB.symbol,
                memo,
            )

            return transferResult.result.map((txResult: { hash?: TxHash }) => txResult?.hash ?? '')[0]
        }
    }

    async donateLiquidityPool(amount: number, inboundAddress: string): Promise<string> {
        const memo = `DONATE:BNB.BNB`
        return await this.poolAddOrSwap(amount, inboundAddress, memo)
    }

    async addLiquidityPool(amount: number, inboundAddress: string, dojAddress?: string): Promise<string> {
        const memo = dojAddress ?
            `ADD:BNB.BNB:${dojAddress}`
            :
            `ADD:BNB.BNB`
        return await this.poolAddOrSwap(amount, inboundAddress, memo)
    }

    async swap(amount: number, token: SwapAssetList, inboundAddress: string, recipient: string): Promise<string> {
        const fromPool = await getPoolData('BNB.BNB')
        const toPool = await getPoolData(token)
        const swapOutput = this.getDoubleSwapOutput(amount, fromPool, toPool)
        console.log('Swap output : ', swapOutput)
        const memo = `SWAP:${token}:${recipient}`

        return await this.poolAddOrSwap(amount, inboundAddress, memo)
    }
}

export { BinanceBeaconClient }