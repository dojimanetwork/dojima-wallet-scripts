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
    tx: Array<BnbGetTranscationHistroyArray>
  }