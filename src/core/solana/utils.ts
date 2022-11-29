import moment from "moment";
import BigNumber from "bignumber.js";

export const SOL_DECIMAL = 9;

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