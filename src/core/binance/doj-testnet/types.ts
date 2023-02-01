export type CoinsType = {
    denom: string,
    amount: number
}

export type BalancesResult = {
    address: string,
    balances: Array<CoinsType>,
    seq: number,
    acc_num: number
}

export type IpOpResultType = {
    address: string,
    coins: Array<CoinsType>
}

export type MsgResultObj = {
    inputs: Array<IpOpResultType>,
    outputs: Array<IpOpResultType>
}

export type SignaturesResultObj = {
    pub_key: any,
    signature: any,
    account_number: number,
    sequence: number
}

export type StdTxObj = {
    msg: Array<MsgResultObj>,
    signatures: Array<SignaturesResultObj>,
    memo: string,
    source: number,
    data: any
}

export type TransferResult = {
    height: number,
    hash: string,
    std_tx: Array<StdTxObj>
}