import {PoolData} from "./types";
import {calcSwapOutput} from "./output";

/** Calculate swap output with slippage */

// Calculate swap slippage
export const calcSwapSlip = (inputAmount: number, pool: PoolData, toDoj: boolean): number => {
    // formula: (inputAmount) / (inputAmount + inputBalance)
    const inputBalance = toDoj ? Number(pool.balance_asset) : Number(pool.balance_doj)// input is asset if toRune
    const result = inputAmount / (inputAmount + inputBalance)
    return result
}

// Calculate swap slippage for double swap
export const calcDoubleSwapSlip = (inputAmount: number, pool1: PoolData, pool2: PoolData): number => {
    // formula: calcSwapSlip1(input1) + calcSwapSlip2(calcSwapOutput1 => input2)
    const swapSlip1 = calcSwapSlip(inputAmount, pool1, true)
    const r = calcSwapOutput(inputAmount, pool1, true)
    const swapSlip2 = calcSwapSlip(r, pool2, false)
    const result = swapSlip1 + swapSlip2
    return result
}
