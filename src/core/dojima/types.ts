export type GasfeeResult = {
    slow: number;
    average: number;
    fast: number;
}

export type DojTxData = {
    transaction_hash: string,
    from: string,
    to: string,
    amount: number,
    gasFee: number,
    block_number: number,
    block_hash: string,
    gasPrice: string,
    nonce: number
}

export type DojTransferParams = {
    recipient: string,
    amount: number,
    fee?: number,
    memo?: string
}