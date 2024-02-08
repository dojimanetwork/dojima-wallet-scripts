import { cosmosclient, proto, rest } from '@cosmos-client/core'
import { Balance, FeeType, Fees, Network, TxHash, TxType, singleFee } from '../client'
import { CosmosSDKClient, TxLog } from '../cosmos'
import {
    Address,
    Asset,
    BaseAmount,
    assetAmount,
    assetFromString,
    assetToBase,
    assetToString,
    baseAmount,
    isSynthAsset, isAssetDOJNative, AssetDOJNative,
} from '@d11k-ts/utils'
import axios from 'axios'
import * as bech32Buffer from 'bech32-buffer'
import Long from 'long'

import { ChainId, ExplorerUrls, NodeInfoResponse, TxData } from './types'
import { MsgNativeTx, MsgSetIpAddressTx, MsgSetPubkeysTx, MsgSetVersionTx } from './messages'
import types from './proto/MsgCompiled'

export const DOJ_DECIMAL = 8
export const DEFAULT_GAS_ADJUSTMENT = 2
export const DEFAULT_GAS_LIMIT_VALUE = '4000000'
export const DEPOSIT_GAS_LIMIT_VALUE = '600000000'
export const MAX_TX_COUNT = 100

const DENOM_DOJ_NATIVE = 'doj'

const DEFAULT_EXPLORER_URL = 'https://api-dev.h4s.dojima.network'
// const DEFAULT_EXPLORER_URL = 'http://localhost:1317'
const txUrl = `${DEFAULT_EXPLORER_URL}/tx`
const addressUrl = `${DEFAULT_EXPLORER_URL}/address`
export const defaultExplorerUrls: ExplorerUrls = {
    root: {
        [Network.Testnet]: `${DEFAULT_EXPLORER_URL}?network=testnet`,
        [Network.Stagenet]: `${DEFAULT_EXPLORER_URL}?network=stagenet`,
        [Network.Mainnet]: DEFAULT_EXPLORER_URL,
    },
    tx: {
        [Network.Testnet]: txUrl,
        [Network.Stagenet]: txUrl,
        [Network.Mainnet]: txUrl,
    },
    address: {
        [Network.Testnet]: addressUrl,
        [Network.Stagenet]: addressUrl,
        [Network.Mainnet]: addressUrl,
    },
}

/**
 * Get denomination from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination of the given asset.
 */
export const getDenom = (asset: Asset): string => {
    if (isAssetDOJNative(asset)) return DENOM_DOJ_NATIVE
    if (isSynthAsset(asset)) return assetToString(asset).toLowerCase()
    return asset.symbol.toLowerCase()
}

/**
 * Get Asset from denomination
 *
 * @param {string} denom
 * @returns {Asset|null} The asset of the given denomination.
 */
export const assetFromDenom = (denom: string): Asset | null => {
    if (denom === DENOM_DOJ_NATIVE) return AssetDOJNative
    return assetFromString(denom.toUpperCase())
}

/**
 * Response guard for transaction broadcast
 *
 * @param {any} response The response from the node.
 * @returns {boolean} `true` or `false`.
 */
export const isBroadcastSuccess = (response: unknown): boolean =>
    typeof response === 'object' &&
    response !== null &&
    'logs' in response &&
    (response as Record<string, unknown>).logs !== undefined

/**
 * Get address prefix based on the network.
 *
 * @param {Network} network
 * @returns {string} The address prefix based on the network.
 *
 **/
export const getPrefix = (network: Network) => {
    switch (network) {
        case Network.Mainnet:
            return 'dojima'
        case Network.Stagenet:
            return 'sdojima'
        case Network.Testnet:
            return 'tdojima'
    }
}

/**
 * Register type for encoding `MsgDeposit` messages
 */
export const registerDepositCodecs = () => {
    cosmosclient.codec.register('/types.MsgDeposit', types.types.MsgDeposit)
}

/**
 * Register type for encoding `MsgSetVersion` messages
 */
 export const registerSetVersionCodecs = () => {
    cosmosclient.codec.register('/types.MsgSetVersion', types.types.MsgSetVersion)
}

/**
 * Register type for encoding `MsgSetNodeKeys` messages
 */
 export const registerSetNodePubkeysCodecs = () => {
    cosmosclient.codec.register('/types.MsgSetNodeKeys', types.types.MsgSetNodeKeys)
}

/**
 * Register type for encoding `MsgSend` messages
 */
export const registerSendCodecs = () => {
    cosmosclient.codec.register('/types.MsgSend', types.types.MsgSend)
}

/**
 * Register type for encoding `MsgSetIpAddress` messages
 */
 export const registerSetIpAddrCodecs = () => {
    cosmosclient.codec.register('/types.MsgSetIPAddress', types.types.MsgSetIPAddress)
}

/**
 * Parse transaction data from event logs
 *
 * @param {TxLog[]} logs List of tx logs
 * @param {Address} address - Address to get transaction data for
 * @returns {TxData} Parsed transaction data
 */
export const getDepositTxDataFromLogs = (logs: TxLog[], address: Address): TxData => {
    const events = logs[0]?.events

    if (!events) {
        throw Error('No events in logs available')
    }

    type TransferData = { sender: string; recipient: string; amount: BaseAmount }
    type TransferDataList = TransferData[]
    const transferDataList: TransferDataList = events.reduce((acc: TransferDataList, { type, attributes }) => {
        if (type === 'transfer') {
            return attributes.reduce((acc2, { key, value }, index) => {
                if (index % 3 === 0) acc2.push({ sender: '', recipient: '', amount: baseAmount(0, DOJ_DECIMAL) })
                const newData = acc2[acc2.length - 1]
                if (key === 'sender') newData.sender = value
                if (key === 'recipient') newData.recipient = value
                if (key === 'amount') newData.amount = baseAmount(value.replace(/doj/, ''), DOJ_DECIMAL)
                return acc2
            }, acc)
        }
        return acc
    }, [])

    const txData: TxData = transferDataList
        // filter out txs which are not based on given address
        .filter(({ sender, recipient }) => sender === address || recipient === address)
        // transform `TransferData` -> `TxData`
        .reduce(
            (acc: TxData, { sender, recipient, amount }) => ({
                ...acc,
                from: [...acc.from, { amount, from: sender }],
                to: [...acc.to, { amount, to: recipient }],
            }),
            { from: [], to: [], type: TxType.Transfer },
        )

    return txData
}

/**
 * Get the default fee.
 *
 * @returns {Fees} The default fee.
 */
export const getDefaultFees = (): Fees => {
    const fee = assetToBase(assetAmount(0.02 /* 0.02 DOJ */, DOJ_DECIMAL))
    return singleFee(FeeType.FlatFee, fee)
}

/**
 * Get transaction type.
 *
 * @param {string} txData the transaction input data
 * @param {string} encoding `base64` or `hex`
 * @returns {string} the transaction type.
 */
export const getTxType = (txData: string, encoding: 'base64' | 'hex'): string => {
    return Buffer.from(txData, encoding).toString().slice(4)
}

/**
 * Helper to get HermesChain's chain id
 * @param {string} nodeUrl HermesNode url
 */
export const getChainId = async (nodeUrl: string): Promise<ChainId> => {
    const { data } = await axios.get<NodeInfoResponse>(`${nodeUrl}/cosmos/base/tendermint/v1beta1/node_info`)
    return data?.default_node_info?.network || Promise.reject('Could not parse chain id')
}

/**
 * Builds final unsigned TX
 *
 * @param cosmosSdk - CosmosSDK
 * @param txBody - txBody with encoded Msgs
 * @param signerPubkey - signerPubkey string
 * @param sequence - account sequence
 * @param gasLimit - transaction gas limit
 * @returns
 */
export const buildUnsignedTx = ({
                                    cosmosSdk,
                                    txBody,
                                    signerPubkey,
                                    sequence,
                                    gasLimit,
                                }: {
    cosmosSdk: cosmosclient.CosmosSDK
    txBody: proto.cosmos.tx.v1beta1.TxBody
    signerPubkey: proto.google.protobuf.Any
    sequence: Long
    gasLimit?: Long
}): cosmosclient.TxBuilder => {
    const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
        signer_infos: [
            {
                public_key: signerPubkey,
                mode_info: {
                    single: {
                        mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
                    },
                },
                sequence: sequence,
            },
        ],
        fee: {
            amount: null,
            gas_limit: gasLimit || null,
        },
    })

    return new cosmosclient.TxBuilder(cosmosSdk, txBody, authInfo)
}

/**
 * Estimates usage of gas
 *
 * Note: Be careful by using this helper function,
 * it's still experimental and result might be incorrect.
 * Change `multiplier` to get a valid estimation of gas.
 */
export const getEstimatedGas = async ({
                                          cosmosSDKClient,
                                          txBody,
                                          privKey,
                                          accountNumber,
                                          accountSequence,
                                          multiplier,
                                      }: {
    cosmosSDKClient: CosmosSDKClient
    txBody: proto.cosmos.tx.v1beta1.TxBody
    privKey: proto.cosmos.crypto.secp256k1.PrivKey
    accountNumber: Long
    accountSequence: Long
    multiplier?: number
}): Promise<Long | undefined> => {
    const pubKey = privKey.pubKey()
    const txBuilder = buildUnsignedTx({
        cosmosSdk: cosmosSDKClient.sdk,
        txBody: txBody,
        signerPubkey: cosmosclient.codec.instanceToProtoAny(pubKey),
        sequence: accountSequence,
    })

    const signDocBytes = txBuilder.signDocBytes(accountNumber)
    txBuilder.addSignature(privKey.sign(signDocBytes))

    const resp = await rest.tx.simulate(cosmosSDKClient.sdk, { tx_bytes: txBuilder.txBytes() })

    const estimatedGas = resp.data?.gas_info?.gas_used ?? null

    if (!estimatedGas) {
        throw new Error('Could not get data of estimated gas')
    }

    return Long.fromString(estimatedGas).multiply(multiplier || DEFAULT_GAS_ADJUSTMENT)
}
/**
 * Structure a MsgDeposit
 *
 * @param {MsgNativeTx} msgNativeTx Msg of type `MsgNativeTx`.
 * @param {string} nodeUrl Node url
 * @param {chainId} ChainId Chain id of the network
 *
 * @returns {Tx} The transaction details of the given transaction id.
 *
 * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
 */
export const buildDepositTx = async ({
                                         msgNativeTx,
                                         nodeUrl,
                                         chainId,
                                     }: {
    msgNativeTx: MsgNativeTx
    nodeUrl: string
    chainId: ChainId
}): Promise<proto.cosmos.tx.v1beta1.TxBody> => {
    const networkChainId = await getChainId(nodeUrl)
    if (!networkChainId || chainId !== networkChainId) {
        throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`)
    }

    const signerAddr = msgNativeTx.signer.toString()
    const signerDecoded = bech32Buffer.decode(signerAddr)

    const msgDepositObj = {
        coins: msgNativeTx.coins,
        memo: msgNativeTx.memo,
        signer: signerDecoded.data,
    }

    const depositMsg = types.types.MsgDeposit.fromObject(msgDepositObj)

    return new proto.cosmos.tx.v1beta1.TxBody({
        messages: [cosmosclient.codec.instanceToProtoAny(depositMsg)],
        memo: msgNativeTx.memo,
    })
}

/**
 * Structure a MsgSetVersion
 *
 * @param {MsgSetVersionTx} msgSetVersionTx Msg of type `MsgSetVersionTx`.
 * @param {string} nodeUrl Node url
 * @param {chainId} ChainId Chain id of the network
 *
 * @returns {Tx} The transaction details of the given transaction id.
 *
 * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
 */
 export const buildSetVersionTx = async ({
    msgSetVersionTx,
    nodeUrl,
    chainId,
}: {
msgSetVersionTx: MsgSetVersionTx
nodeUrl: string
chainId: ChainId
}): Promise<proto.cosmos.tx.v1beta1.TxBody> => {
const networkChainId = await getChainId(nodeUrl)
if (!networkChainId || chainId !== networkChainId) {
throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`)
}

const signerAddr = msgSetVersionTx.signer.toString()
const signerDecoded = bech32Buffer.decode(signerAddr)

const msgSetVersionObj = {
version: msgSetVersionTx.version,
signer: signerDecoded.data,
}

const versionMsg = types.types.MsgSetVersion.fromObject(msgSetVersionObj)

return new proto.cosmos.tx.v1beta1.TxBody({
messages: [cosmosclient.codec.instanceToProtoAny(versionMsg)],
})
}

/**
 * Structure a MsgSetIpAddress
 *
 * @param {MsgSetIpAddressTx} msgSetIpAddressTx Msg of type `MsgSetIpAddressTx`.
 * @param {string} nodeUrl Node url
 * @param {chainId} ChainId Chain id of the network
 *
 * @returns {Tx} The transaction details of the given transaction id.
 *
 * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
 */
 export const buildSetIpAddressTx = async ({
    msgSetIpAddressTx,
    nodeUrl,
    chainId,
}: {
msgSetIpAddressTx: MsgSetIpAddressTx
nodeUrl: string
chainId: ChainId
}): Promise<proto.cosmos.tx.v1beta1.TxBody> => {
const networkChainId = await getChainId(nodeUrl)
if (!networkChainId || chainId !== networkChainId) {
throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`)
}

const signerAddr = msgSetIpAddressTx.signer.toString()
const signerDecoded = bech32Buffer.decode(signerAddr)

const msgSetIpAddressObj = {
ipAddress: msgSetIpAddressTx.ipAddress,
signer: signerDecoded.data,
}

const ipAddressMsg = types.types.MsgSetIPAddress.fromObject(msgSetIpAddressObj)

return new proto.cosmos.tx.v1beta1.TxBody({
messages: [cosmosclient.codec.instanceToProtoAny(ipAddressMsg)],
})
}

/**
 * Structure a MsgSetNodeKeys
 *
 * @param {MsgSetPubkeysTx} msgSetPubkeysTx Msg of type `MsgSetPubkeysTx`.
 * @param {string} nodeUrl Node url
 * @param {chainId} ChainId Chain id of the network
 *
 * @returns {Tx} The transaction details of the given transaction id.
 *
 * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
 */
 export const buildSetPubkeysTx = async ({
    msgSetNodePubkeysTx,
    nodeUrl,
    chainId,
}: {
msgSetNodePubkeysTx: MsgSetPubkeysTx
nodeUrl: string
chainId: ChainId
}): Promise<proto.cosmos.tx.v1beta1.TxBody> => {
const networkChainId = await getChainId(nodeUrl)
if (!networkChainId || chainId !== networkChainId) {
throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`)
}

const signerAddr = msgSetNodePubkeysTx.signer.toString()
const signerDecoded = bech32Buffer.decode(signerAddr)

const msgSetNodePubkeysObj = {
    pubKeySetSet: {
        secp256k1: msgSetNodePubkeysTx.secp256k1Pubkey,
        ed25519: msgSetNodePubkeysTx.ed25519Pubkey,
    },
    validatorConsPubKey: msgSetNodePubkeysTx.validatorConsPubkey,
    signer: signerDecoded.data,
}

const nodePubkeysMsg = types.types.MsgSetNodeKeys.fromObject(msgSetNodePubkeysObj)
return new proto.cosmos.tx.v1beta1.TxBody({
messages: [cosmosclient.codec.instanceToProtoAny(nodePubkeysMsg)],
})
}

/**
 * Structure a MsgSend
 *
 * @param fromAddress - required, from address string
 * @param toAddress - required, to address string
 * @param assetAmount - required, asset amount string (e.g. "10000")
 * @param assetDenom - required, asset denom string (e.g. "doj")
 * @param memo - optional, memo string
 *
 * @returns
 */
export const buildTransferTx = async ({
                                          fromAddress,
                                          toAddress,
                                          assetAmount,
                                          assetDenom,
                                          memo = '',
                                          nodeUrl,
                                          chainId,
                                      }: {
    fromAddress: Address
    toAddress: Address
    assetAmount: BaseAmount
    assetDenom: string
    memo?: string
    nodeUrl: string
    chainId: ChainId
}): Promise<proto.cosmos.tx.v1beta1.TxBody> => {
    const networkChainId = await getChainId(nodeUrl)
    if (!networkChainId || chainId !== networkChainId) {
        throw new Error(`Invalid network (asked: ${chainId} / returned: ${networkChainId}`)
    }

    const fromDecoded = bech32Buffer.decode(fromAddress)
    const toDecoded = bech32Buffer.decode(toAddress)

    const transferObj = {
        fromAddress: fromDecoded.data,
        toAddress: toDecoded.data,
        amount: [
            {
                amount: assetAmount.amount().toString(),
                denom: assetDenom,
            },
        ],
    }

    const transferMsg = types.types.MsgSend.fromObject(transferObj)

    return new proto.cosmos.tx.v1beta1.TxBody({
        messages: [cosmosclient.codec.instanceToProtoAny(transferMsg)],
        memo,
    })
}

/**
 * Get the balance of a given address.
 *
 * @param {Address} address By default, it will return the balance of the current wallet. (optional)
 * @param {Asset} asset If not set, it will return all assets available. (optional)
 * @param {cosmosClient} CosmosSDKClient
 *
 * @returns {Balance[]} The balance of the address.
 */
export const getBalance = async ({
                                     address,
                                     assets,
                                     cosmosClient,
                                 }: {
    address: Address
    assets?: Asset[]
    cosmosClient: CosmosSDKClient
}): Promise<Balance[]> => {
    const balances = await cosmosClient.getBalance(address);
    if(balances.length === 0) {
        const data = [
            {
                asset: AssetDOJNative,
                amount: baseAmount(0, DOJ_DECIMAL)
            }
        ]
        return data
    } else {
        return balances
            .map((balance) => ({
                asset: (balance.denom && assetFromDenom(balance.denom)) || AssetDOJNative,
                amount: baseAmount(balance.amount, DOJ_DECIMAL),
            }))
            .filter(
                (balance) => !assets || assets.filter((asset) => assetToString(balance.asset) === assetToString(asset)).length,
            )
    }
}

/**
 * Get the explorer url.
 *
 * @param {Network} network
 * @param {ExplorerUrls} Explorer urls
 * @returns {string} The explorer url for hermeschain based on the given network.
 */
export const getExplorerUrl = ({ root }: ExplorerUrls, network: Network): string => root[network]

/**
 * Get explorer address url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {Address} address
 * @returns {string} The explorer url for the given address.
 */
export const getExplorerAddressUrl = ({
                                          urls,
                                          network,
                                          address,
                                      }: {
    urls: ExplorerUrls
    network: Network
    address: Address
}): string => {
    const url = `${urls.address[network]}/${address}`
    switch (network) {
        case Network.Mainnet:
            return url
        case Network.Stagenet:
            return `${url}?network=stagenet`
        case Network.Testnet:
            return `${url}?network=testnet`
    }
}

/**
 * Get transaction url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {TxHash} txID
 * @returns {string} The explorer url for the given transaction id.
 */
export const getExplorerTxUrl = ({
                                     urls,
                                     network,
                                     txID,
                                 }: {
    urls: ExplorerUrls
    network: Network
    txID: TxHash
}): string => {
    const url = `${urls.tx[network]}/${txID}`
    switch (network) {
        case Network.Mainnet:
            return url
        case Network.Stagenet:
            return `${url}?network=stagenet`
        case Network.Testnet:
            return `${url}?network=testnet`
    }
}