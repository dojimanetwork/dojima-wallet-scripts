export type SolTxParams = {
    walletIndex?: number,
    recipient: string,
    amount: number
}
export type SolTxData = {
    transaction_hash: string;
    timeStamp: number;
    gasFee: number;
    amount: number;
    block: number;
    from: string;
    to: string;
    recentBlockHash: string;
    instructionData: string;
}
export type SolTxsHistoryParams = {
    address: string;
    offset?: number;
    beforeHash?: string;
    untilHash?: string;
}
export type SolTxs = {
    total: number
    txs: Array<SolTxData>;
}
export type GasfeeResult = {
    slow: number;
    average: number;
    fast: number;
}