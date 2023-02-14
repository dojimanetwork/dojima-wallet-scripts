import { FeeRate, Network } from '../../client'
import { Address } from '../../utils'

export type NormalTxParams = { addressTo: Address; amount: number; feeRate: FeeRate }
export type VaultTxParams = NormalTxParams & { memo: string }

export type GetChangeParams = {
    valueOut: number
    sochainUrl: string
    network: Network
    address: Address
}

export type ClientUrl = Record<Network, string>