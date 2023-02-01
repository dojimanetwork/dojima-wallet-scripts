import axios from "axios";
import {BalancesResult, TransferResult} from "./types";
import {AssetBNB} from "../../utils";
import {BNB_DECIMAL} from "../types";

class BnbDojTestnetClient {
    protected dojTestnetUrl = "";

    constructor(dojTestnetUrl: string) {
        this.dojTestnetUrl = dojTestnetUrl;
    }

    async getBalance(address: string): Promise<number> {
        const response = await axios.get(`${this.dojTestnetUrl}/accounts`);
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve balance for address. Dojima binance gateway responded with status ${response.status}.`
            );
        }

        let balance: number
        const data: Array<BalancesResult> = response.data;
        if(data.length > 0) {
            const balanceObj = data.find((res) => res.address === address);
            if(balanceObj.balances && balanceObj.balances.length > 0) {
                const bal = balanceObj.balances.find((res) => res.denom === AssetBNB.symbol)
                balance = bal.amount / Math.pow(10, BNB_DECIMAL)
            } else {
                balance = 0
            }
        }
        else {
            balance = 0
        }
        return balance;
    }

    async transfer(recipient: string, amount: number, address: string, memo?: string): Promise<string> {
        const dataObj = memo
            ? {
                "from": `${address}`,
                "to": `${recipient}`,
                "coins": [
                    {
                        "denom": AssetBNB.symbol,
                        "amount": amount * Math.pow(10, BNB_DECIMAL)
                    }
                ],
                "memo": `${memo}`
            }
            :
            {
                "from": `${address}`,
                "to": `${recipient}`,
                "coins": [
                    {
                        "denom": AssetBNB.symbol,
                        "amount": amount * Math.pow(10, BNB_DECIMAL)
                    }
                ]
            }

        const axiosData = JSON.stringify([dataObj]);
        const response = await axios.post(`${this.dojTestnetUrl}/broadcast/easy`, axiosData);
        if (response.status !== 200) {
            throw new Error(
                `Unable to broadcast transaction. Dojima binance gateway responded with status ${response.status}.`
            );
        }

        const data: TransferResult = response.data
        return data.hash
    }
}

export { BnbDojTestnetClient };
