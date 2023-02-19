import {PoolData} from "./types";

// Calculate swap output with slippage
export const calcSwapOutput = (inputAmount: number, pool: PoolData, toDoj: boolean): number => {
    // formula: (inputAmount * inputBalance * outputBalance) / (inputAmount + inputBalance) ^ 2
    const inputBalance = toDoj ? Number(pool.balance_asset) : Number(pool.balance_doj) // input is asset if toDoj
    const outputBalance = toDoj ? Number(pool.balance_doj) : Number(pool.balance_asset) // output is doj if toDoj
    const numerator = inputAmount * inputBalance * outputBalance
    const denominator = Math.pow((inputAmount + inputBalance), 2)
    const result = numerator / denominator
    return result
}

export const calcDoubleSwapOutput = (inputAmount: number, pool1: PoolData, pool2: PoolData): number => {
    // formula: calcSwapOutput(pool1) => calcSwapOutput(pool2)
    const r = calcSwapOutput(inputAmount, pool1, true)
    const output = calcSwapOutput(r, pool2, false)
    return output
}