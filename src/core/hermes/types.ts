import { Network, Tx, TxParams } from '@d11k-ts/client'
import { Asset, BaseAmount } from '@d11k-ts/utils'
import BigNumber from 'bignumber.js'
import Long from 'long'

export type NodeUrl = {
    node: string
    rpc: string
}

export type ClientUrl = Record<Network, NodeUrl>

export type ExplorerUrls = {
    root: ExplorerUrl
    tx: ExplorerUrl
    address: ExplorerUrl
}

export type ExplorerUrl = Record<Network, string>

export type ChainId = string
export type ChainIds = Record<Network, ChainId>

export type HermeschainClientParams = {
    clientUrl?: ClientUrl
    explorerUrls?: ExplorerUrls
    chainIds?: ChainIds
}

export type DepositParam = {
    walletIndex?: number
    asset?: Asset
    amount: BaseAmount
    memo: string
    gasLimit?: BigNumber
}

export type TxData = Pick<Tx, 'from' | 'to' | 'type'>

export type TxOfflineParams = TxParams & {
    /**
     * Balance of DOJ to send from
     */
    fromDojBalance: BaseAmount
    /**
     * Balance of asset to send from
     * Optional: It can be ignored if asset to send from is DOJ
     */
    fromAssetBalance?: BaseAmount
    fromAccountNumber: Long
    fromSequence: Long
    gasLimit?: BigNumber
}

/**
 * Response from `hermeschain/constants` endpoint
 */
export type HermeschainConstantsResponse = {
    int_64_values: {
        // We are in fee interested only - ignore all other values
        NativeTransactionFee: number
    }
}

/**
 * Response of `/cosmos/base/tendermint/v1beta1/node_info`
 * Note: We are interested in `network` (aka chain id) only
 */
export type NodeInfoResponse = {
    default_node_info: {
        network: string
    }
}
/**
 * Response of `/cosmos/tx/v1beta1/simulateo`
 * Note: We are interested in `network` (aka chain id) only
 */
export type SimulateResponse = {
    gas_info: {
        gas_used: string
    }
}