/**
 * Haskoin API types
 */

import { Address } from '@d11k-ts/utils'

export type UtxoData = {
    txid: string
    index: number
    value: number
    pkscript: string
}

export type BalanceData = {
    address: Address
    confirmed: number
    unconfirmed: number
    utxo: number
    txs: number
    received: number
}