import {PoolData} from "./types";
// import {getTokenDecimal} from "../../../__tests__/automate/utils/getPoolData";

// Calculate swap output with slippage
export const calcSwapOutput = (inputAmount: number, pool: PoolData, toDoj: boolean): number => {
    // formula: (inputAmount * inputBalance * outputBalance) / (inputAmount + inputBalance) ^ 2
    const inputBalance = toDoj ? Number(pool.balance_asset) : Number(pool.balance_doj) // input is asset if toDoj
    const outputBalance = toDoj ? Number(pool.balance_doj) : Number(pool.balance_asset) // output is doj if toDoj
    const numerator = inputAmount * inputBalance * outputBalance
    const denominator = Math.pow((inputAmount + inputBalance), 2)
    const result = numerator / denominator
    // return result / Math.pow(10, getTokenDecimal(pool.asset))
    return result
}

export const calcDoubleSwapOutput = (inputAmount: number, pool1: PoolData, pool2: PoolData): number => {
    // formula: calcSwapOutput(pool1) => calcSwapOutput(pool2)
    const r = calcSwapOutput(inputAmount, pool1, true)
    const result = calcSwapOutput(r, pool2, false)
    // return result / Math.pow(10, getTokenDecimal(pool2.asset))
    return result
}

export const calcSwapFee = (inputAmount: number, pool: PoolData, toRune: boolean): number => {
    // formula: (x * x * Y) / (x + X) ^ 2
    const x = inputAmount
    const X = toRune ? Number(pool.balance_asset) : Number(pool.balance_doj) // input is asset if toRune
    const Y = toRune ? Number(pool.balance_doj) : Number(pool.balance_asset) // output is rune if toRune
    const numerator = x * x * Y
    const denominator = Math.pow((x + X), 2)
    const result = numerator / denominator
    return result
}

export const getValueOfRuneInAsset = (inputRune: number, pool: PoolData) => {
    // formula: ((r * A) / R) => A per R ($perRune)
    const r = inputRune
    const R = Number(pool.balance_doj)
    const A = Number(pool.balance_asset)
    const result = (r * A) / R
    return result
}


export const calcDoubleSwapFee = (inputAmount: number, pool1: PoolData, pool2: PoolData) => {
    const fee1 = calcSwapFee(inputAmount, pool1, true)
    const r = calcSwapOutput(inputAmount, pool1, true)
    const fee2 = calcSwapFee(r, pool2, false)
    const fee1Asset = getValueOfRuneInAsset(fee1, pool2)
    const result = fee2 + fee1Asset
    return result

}