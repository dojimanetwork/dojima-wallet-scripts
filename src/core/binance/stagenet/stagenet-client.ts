import axios from "axios";

export const BnbDenom = 'bnb'

export type CoinsType = {
    denom: string,
    amount: number
}

export type BnbBcnStagenetTxParams = {
    from: string,
    to: string,
    coins: Array<CoinsType>,
    memo: string,
}

export type BalancesResult = {
    address: string,
    balances: Array<CoinsType> | [],
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

class BncStagenetClient {
    protected clientStageUrl = "";
    protected phrase = "";

    constructor(phrase: string, clientStageUrl: string) {
        this.phrase = phrase;
        this.clientStageUrl = clientStageUrl;
    }

    async getBalance(address: string): Promise<number> {
        const response = await axios.get(`${this.clientStageUrl}/accounts`);
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve balance for address. Dojima binance gateway responded with status ${response.status}.`
            );
        }

        const data: Array<BalancesResult> = response.data;
        const balanceObj = data.find((res) => res.address === address);
        let balance: number
        if(balanceObj.balances === []) {
            balance = 0
        } else {
            const bal = balanceObj.balances.find((res) => res.denom === BnbDenom)
            balance = bal.amount / Math.pow(10, 8)
        }
        return balance;
    }

    async transfer(recipient: string, amount: number, memo?: string): Promise<string> {
        const dataObj = memo
            ? {
                // "from": `${this.getAddress()}`,
                "from": 'tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va',
                "to": `${recipient}`,
                "coins": [
                    {
                        "denom": BnbDenom,
                        "amount": amount * Math.pow(10, 8)
                    }
                ],
                "memo": `${memo}`
            }
            :
            {
                // "from": `${this.getAddress()}`,
                "from": 'tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va',
                "to": `${recipient}`,
                "coins": [
                    {
                        "denom": BnbDenom,
                        "amount": amount * Math.pow(10, 8)
                    }
                ]
            }
        const axiosData = JSON.stringify([dataObj]);
        const response = await axios.post(`${this.clientStageUrl}/broadcast/easy`, axiosData);
        if (response.status !== 200) {
            throw new Error(
                `Unable to broadcast transaction. Dojima binance gateway responded with status ${response.status}.`
            );
        }

        const data: TransferResult = response.data
        console.log('Data : ', data)
        return data.hash
    }
}

export { BncStagenetClient };
