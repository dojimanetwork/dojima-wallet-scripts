export type GasfeeResult = {
    slow: number;
    average: number;
    fast: number;
};

export type EthTxData = {
    transaction_hash: string;
    from: string;
    to: string;
    amount: number;
    gasFee: number;
    block_number: number;
    block_hash: string;
    gasPrice: string;
    nonce: number;
};

export type EthTransferParams = {
    recipient: string;
    amount: number;
    fee?: number;
    memo?: string;
};

export type SortType = "desc" | "asc";

export type EthTxHistoryParams = {
    address: string;
    apiKey: string;
    page?: number;
    limit?: number;
    sort?: SortType;
    startBlock?: number;
    endBlock?: number;
};

export type EthTxDetailsResult = {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
};

export type EthTxsArrayResult = {
    block: number;
    date: string;
    time: string;
    transaction_hash: string;
    contract_address: string;
    value: number;
    gas_price: string;
    from: string;
    to: string;
    transaction_type: string;
}

export type EthTxs = {
    total: number
    txs: Array<EthTxsArrayResult>;
}

export type TransactionHistoryResult = {
    status: string;
    message: string;
    result: EthTxDetailsResult[];
};