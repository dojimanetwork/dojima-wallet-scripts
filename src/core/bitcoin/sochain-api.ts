import { Network, TxHash } from '../client'
import {BaseAmount, assetAmount, assetToBase} from '../utils'
import axios from 'axios'

import { BTC_DECIMAL } from './const'
import {
    AddressParams,
    BtcAddressDTO,
    BtcAddressUTXO,
    BtcBroadcastTransfer,
    BtcGetBalanceDTO,
    BtcUnspentTxsDTO,
    SochainResponse,
    Transaction,
    TxBroadcastParams,
    TxConfirmedStatus,
    TxHashParams,
} from './types/sochain-api-types'

const DEFAULT_SUGGESTED_TRANSACTION_FEE = 127

const toSochainNetwork = (network: Network): string => {
    switch (network) {
        case Network.Mainnet:
        case Network.Stagenet:
            return 'BTC'
        case Network.Testnet:
            return 'BTCTEST'
    }
}

/**
 * Get address information.
 *
 * @see https://sochain.com/api#get-display-data-address
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {BtcAddressDTO}
 */
export const getAddress = async ({ sochainUrl, network, address }: AddressParams): Promise<BtcAddressDTO> => {
    const url = `${sochainUrl}/address/${toSochainNetwork(network)}/${address}`
    const response = await axios.get(url)
    const addressResponse: SochainResponse<BtcAddressDTO> = response.data
    return addressResponse.data
}

/**
 * Get transaction by hash.
 *
 * @see https://sochain.com/api#get-tx
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network network id
 * @param {string} hash The transaction hash.
 * @returns {Transactions}
 */
export const getTx = async ({ sochainUrl, network, hash }: TxHashParams): Promise<Transaction> => {
    const url = `${sochainUrl}/get_tx/${toSochainNetwork(network)}/${hash}`
    const response = await axios.get(url)
    const tx: SochainResponse<Transaction> = response.data
    return tx.data
}

/**
 * Get address balance.
 *
 * @see https://sochain.com/api#get-balance
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network Network
 * @param {string} address Address
 * @param {boolean} confirmedOnly Flag whether to get balances of confirmed txs only or for all
 * @returns {number}
 */
export const getBalance = async ({
                                     sochainUrl,
                                     network,
                                     address,
                                     confirmedOnly,
                                 }: AddressParams & { confirmedOnly: boolean }): Promise<BaseAmount> => {
    const url = `${sochainUrl}/get_address_balance/${toSochainNetwork(network)}/${address}`
    const response = await axios.get(url)
    const balanceResponse: SochainResponse<BtcGetBalanceDTO> = response.data
    const confirmed = assetAmount(balanceResponse.data.confirmed_balance, BTC_DECIMAL)
    const unconfirmed = assetAmount(balanceResponse.data.unconfirmed_balance, BTC_DECIMAL)
    const netAmt = confirmedOnly ? confirmed : confirmed.plus(unconfirmed)
    const result = assetToBase(netAmt)
    return result
}

/**
 * Get unspent txs
 *
 * @see https://sochain.com/api#get-unspent-tx
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {string} network
 * @param {string} address
 * @returns {BtcAddressUTXO[]}
 */
export const getUnspentTxs = async ({
                                        sochainUrl,
                                        network,
                                        address,
                                        startingFromTxId,
                                    }: AddressParams): Promise<BtcAddressUTXO[]> => {
    const url = [
        sochainUrl,
        'get_tx_unspent',
        toSochainNetwork(network),
        address,
        startingFromTxId ? startingFromTxId : null,
    ]
        .filter((v) => !!v)
        .join('/')
    const resp = await axios.get(url)
    const response: SochainResponse<BtcUnspentTxsDTO> = resp.data
    const txs = response.data.txs
    if (txs.length === 100) {
        //fetch the next batch
        const lastTxId = txs[99].txid

        const nextBatch = await getUnspentTxs({
            sochainUrl,
            network,
            address,
            startingFromTxId: lastTxId,
        })
        return txs.concat(nextBatch)
    } else {
        return txs
    }
}

/**
 * Get Tx Confirmation status
 *
 * @see https://sochain.com/api#get-is-tx-confirmed
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {Network} network
 * @param {string} hash tx id
 * @returns {TxConfirmedStatus}
 */
export const getIsTxConfirmed = async ({ sochainUrl, network, hash }: TxHashParams): Promise<TxConfirmedStatus> => {
    const { data } = await axios.get<SochainResponse<TxConfirmedStatus>>(
        `${sochainUrl}/is_tx_confirmed/${toSochainNetwork(network)}/${hash}`,
    )
    return data.data
}

/**
 * List of confirmed txs
 *
 * Stores a list of confirmed txs (hashes) in memory to avoid requesting same data
 */
const confirmedTxs: Array<TxHash> = []

/**
 * Helper to get `confirmed` status of a tx.
 *
 * It will get it from cache or try to get it from Sochain (if not cached before)
 */
export const getConfirmedTxStatus = async ({
                                               txHash,
                                               sochainUrl,
                                               network,
                                           }: {
    sochainUrl: string
    txHash: TxHash
    network: Network
}): Promise<boolean> => {
    // try to get it from cache
    if (confirmedTxs.includes(txHash)) return true
    // or get status from Sochain
    const { is_confirmed } = await getIsTxConfirmed({
        sochainUrl,
        network,
        hash: txHash,
    })
    // cache status
    confirmedTxs.push(txHash)
    return is_confirmed
}

/**
 * Get unspent txs and filter out pending UTXOs
 *
 * @see https://sochain.com/api#get-unspent-tx
 *
 * @param {string} sochainUrl The sochain node url.
 * @param {Network} network
 * @param {string} address
 * @returns {BtcAddressUTXO[]}
 */
export const getConfirmedUnspentTxs = async ({
                                                 sochainUrl,
                                                 network,
                                                 address,
                                             }: AddressParams): Promise<BtcAddressUTXO[]> => {
    const txs = await getUnspentTxs({
        sochainUrl,
        network,
        address,
    })

    const confirmedUTXOs: BtcAddressUTXO[] = []

    await Promise.all(
        txs.map(async (tx: BtcAddressUTXO) => {
            const confirmed = await getConfirmedTxStatus({
                sochainUrl,
                network,
                txHash: tx.txid,
            })

            if (confirmed) {
                confirmedUTXOs.push(tx)
            }
        }),
    )

    return confirmedUTXOs
}

/**
 * Get Bitcoin suggested transaction fee.
 *
 * @returns {number} The Bitcoin suggested transaction fee per bytes in sat.
 */
export const getSuggestedTxFee = async (): Promise<number> => {
    //Note: sochain does not provide fee rate related data
    //So use Bitgo API for fee estimation
    //Refer: https://app.bitgo.com/docs/#operation/v2.tx.getfeeestimate
    try {
        const response = await axios.get('https://app.bitgo.com/api/v2/btc/tx/fee')
        return response.data.feePerKb / 1000 // feePerKb to feePerByte
    } catch (error) {
        return DEFAULT_SUGGESTED_TRANSACTION_FEE
    }
}

/**
 * Broadcast transaction.
 *
 * @param {TxBroadcastParams} params
 * @returns {TxHash} Transaction hash.
 */
export const broadcastTx = async ({ txHex, sochainUrl, network }: TxBroadcastParams): Promise<TxHash> => {
    const { data } = await axios.post<SochainResponse<BtcBroadcastTransfer>>(
        `${sochainUrl}/send_tx/${toSochainNetwork(network)}/${txHex}`,
    )
    return data.data.txid
}