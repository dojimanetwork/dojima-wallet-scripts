export type Balance = {
    /**
     * asset symbol, e.g. BNB
     */
    symbol: string
    /**
     * In decimal form, e.g. 0.00000000
     */
    free: string
    /**
     * In decimal form, e.g. 0.00000000
     */
    locked: string
    /**
     * In decimal form, e.g. 0.00000000
     */
    frozen: string
  }

  export type TransactionParam ={
    address : string
    startTime?: string 
    endTime ?: string 
    limit ?: number 
    offset ?: number 
  }

  export type TransctionDetails = {
    txhash : string
    from: string
    to : string
    amount: number
    assest: string
  }

  export interface BnBMsgValueCoinsResult {
    amount: string;
    denom: string;
  }
  export interface BnBMsgValueResult {
    address: string;
    coins: BnBMsgValueCoinsResult[];
  }
  
  export interface BnBMsgValue {
    type: string;
    value: {
      inputs: BnBMsgValueResult[];
      outputs: BnBMsgValueResult[];
    }
  }

  export interface BnBsignaturePublicKey{
    type: string
    value: string
  }

  export interface BNBValueSignature{
    accountNumber: string
    pub_key:BnBsignaturePublicKey
    sequence: string
    signature: string
  }
  
  export interface BnbTxValue{
    memo:string
    msg: BnBMsgValue
    signature: BNBValueSignature
    source: string
  }

  export interface BnBTx{
    type: string
    value: BnbTxValue
  }

  export interface BnbGetTransctionData{
    hash: string
    height: string
    tx: BnBTx
  }

  export interface BnbGetTranscationHistroyArray{
    txHash: string
    blockHeight: number
    txType: string
    timeStamp: string
    fromAddr: string
    toAddr: string
    value: string
    txAssest: string
    txFee: string
  }
  export type BnbGetTranscationHistroyArrayResult ={
  tx:Array<BnbGetTranscationHistroyArray>
  }
  export interface BnbGetTranscationHistroy{
    tx: BnbGetTranscationHistroyArray[]
    total: number
  }

  export interface BnbGetTranscationHistroyFinalResult{
    txs: Array<BnbGetTranscationHistroyArray>
  }

  export type TransferFee = {
    fixed_fee_params: Fee
    multi_transfer_fee: number
    lower_limit_as_multi: number
  }
  
  export type DexFeeName =
    | 'ExpireFee'
    | 'ExpireFeeNative'
    | 'CancelFee'
    | 'CancelFeeNative'
    | 'FeeRate'
    | 'FeeRateNative'
    | 'IOCExpireFee'
    | 'IOCExpireFeeNative'
  
  export type DexFee = {
    fee_name: DexFeeName
    fee_value: number
  }
  
  export type DexFees = {
    dex_fee_fields: DexFee[]
  }
  
  export type Fees = (Fee | TransferFee | DexFees)[]
  export type FeeType =
  | 'submit_proposal'
  | 'deposit'
  | 'vote'
  | 'create_validator'
  | 'remove_validator'
  | 'dexList'
  | 'orderNew'
  | 'orderCancel'
  | 'issueMsg'
  | 'mintMsg'
  | 'tokensBurn'
  | 'tokensFreeze'
  | 'send'
  | 'timeLock'
  | 'timeUnlock'
  | 'timeRelock'
  | 'setAccountFlags'
  | 'HTLT'
  | 'depositHTLT'
  | 'claimHTLT'
  | 'refundHTLT'

export type Fee = {
  msg_type: FeeType
  fee: number
  fee_for: number
}
export const isTransferFee = (v: Fee | TransferFee | DexFees): v is TransferFee =>
  isFee((v as TransferFee)?.fixed_fee_params) && !!(v as TransferFee)?.multi_transfer_fee
export const isFee = (v: Fee | TransferFee | DexFees): v is Fee =>
  !!(v as Fee)?.msg_type && (v as Fee)?.fee !== undefined && (v as Fee)?.fee_for !== undefined