import moment from "moment";
import BigNumber from "bignumber.js";
import {Dojima} from "./types";

export const SOL_DECIMAL = 9;

export const IDL: Dojima = {
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

export const lamportsToBase = (asset: number, decimal: number): number => {
    const baseValue = (new BigNumber(asset)).div(10 ** decimal).decimalPlaces(decimal);
    return baseValue.toNumber()
}

export const baseToLamports = (base: number, decimal: number): number => {
    const assetValue = (new BigNumber(base)).multipliedBy(10 ** decimal).integerValue();
    return assetValue.toNumber()
}

export const convertDateToTimestamp = (date: string) => {
    const timestamp = moment(date).format("X"); // lowercase 'x' for timestamp in milliseconds
    return Number(timestamp);
}

export const convertTimestampToDate = (timestamp: number) => {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
}

export const convertISOtoUTC = (date: string) => {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
}