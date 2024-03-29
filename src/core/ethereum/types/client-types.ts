import { FeeOption, Fees, Network } from '@d11k-ts/client'
import { Address, BaseAmount } from '@d11k-ts/utils'
import { BigNumber, Signer, ethers } from 'ethers'

export enum EthNetwork {
    Test = 'goerli',
    Main = 'homestead',
}

export type ClientUrl = Record<Network, string>
export type ExplorerUrl = Record<Network, string>

export type TxOverrides = {
    nonce?: ethers.BigNumberish

    // mandatory: https://github.com/ethers-io/ethers.js/issues/469#issuecomment-475926538
    gasLimit: ethers.BigNumberish
    gasPrice?: ethers.BigNumberish
    data?: ethers.BytesLike
    value?: ethers.BigNumberish
}

export type InfuraCreds = {
    projectId: string
    projectSecret?: string
}

export type GasPrices = Record<FeeOption, BaseAmount>

export type FeesWithGasPricesAndLimits = { fees: Fees; gasPrices: GasPrices; gasLimit: BigNumber }

export type ApproveParams = {
    walletIndex?: number
    signer?: Signer
    contractAddress: Address
    spenderAddress: Address
    feeOption?: FeeOption
    amount?: BaseAmount
    // Optional fallback in case estimation for gas limit fails
    gasLimitFallback?: ethers.BigNumberish
}

export type EstimateApproveParams = {
    contractAddress: Address
    spenderAddress: Address
    fromAddress: Address
    amount?: BaseAmount
}

export type IsApprovedParams = {
    walletIndex?: number
    contractAddress: Address
    spenderAddress: Address
    amount?: BaseAmount
}

export type CallParams = {
    signer?: Signer
    walletIndex?: number
    contractAddress: Address
    abi: ethers.ContractInterface
    funcName: string
    funcParams?: unknown[]
}

export type EstimateCallParams = Pick<CallParams, 'contractAddress' | 'abi' | 'funcName' | 'funcParams'>

// export type EthTxDataResult = {
//     blockHash: string,
//     blockNumber: string,
//     from: string,
//     gas: string,
//     gasPrice: string,
//     hash: string,
//     input: string,
//     nonce: string,
//     to: string,
//     transactionIndex: string,
//     value: string,
//     type: string,
//     chainId: string,
//     v: string,
//     r: string,
//     s: string,
//     maxFeePerGas?: string,
//     maxPriorityFeePerGas?: string
// }
// export type EthTxDataType = {
//     jsonrpc: string,
//     id: number,
//     result: EthTxDataResult
// }