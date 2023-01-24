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

export type Dojima = {
    "version": "0.1.0",
    "name": "dojima",
    "instructions": [
        {
            "name": "transferNativeTokens",
            "accounts": [
                {
                    "name": "from",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "to",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "tokenAmount",
                    "type": "string"
                },
                {
                    "name": "memo",
                    "type": "string"
                }
            ]
        }
    ]
};