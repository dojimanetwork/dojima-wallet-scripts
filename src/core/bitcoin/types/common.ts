import { Network } from '@d11k-ts/client'

export declare const BTC_DECIMAL = 8;

export type Witness = {
    value: number
    script: Buffer
}
export type UTXO = {
    hash: string
    index: number
    value: number
    witnessUtxo: Witness
    txHex?: string
}

export type BroadcastTxParams = { txHex: string; haskoinUrl: string }

// We might extract it into chain-client later
export type DerivePath = Record<Network, string>