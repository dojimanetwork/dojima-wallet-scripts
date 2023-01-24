export type GasfeeResult = {
    slow: number;
    average: number;
    fast: number;
}

export type TxConfirmedData = {
    block_indep_hash: string;
    block_height: number;
    number_of_confirmations: number;
}
export type TxStatusResponse = {
    status: number;
    confirmed: TxConfirmedData | null;
}

export type ArTxParams = {
    recipient: string
    amount: number
}

export type OuterDataResult = {
    timestamp: string;
    transaction_hash: string;
    block: string;
    from: string;
    to: string;
    value: string;
    gas_price: string;
    date: string;
    time: string;
}

export type InnerDataResult = {
    timestamp: string;
    transaction_hash: string;
    block: string;
    from: string;
    to: string;
    value: string;
    gas_price: string;
    date: string;
    time: string;
    signature: string;
    block_hash: string;
}

export type ArTxsHistoryParams = {
    address: string;
    limit?: number;
}

export type ArTxsResult = {
    outer: OuterDataResult[];
    inner: InnerDataResult[];
}

export type ArTxs = {
    total: number,
    txs: ArTxsResult
}

export type ArTxDataResult = {
    transaction_hash: string;
    from: string;
    to: string;
    value: number;
    gas_price: string;
    signature: string;
}