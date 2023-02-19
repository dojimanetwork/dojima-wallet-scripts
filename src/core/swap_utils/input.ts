// The swap formula can be reversed to specify what needs to be deposited to get a certain output.

import {PoolData} from "./types";

export const calcSwapInput = (toDoj: boolean, pool: PoolData, outputAmount: number): number => {
    // formula: (((X*Y)/y - 2*X) - sqrt(((X*Y)/y - 2*X)^2 - 4*X^2))/2
    // (part1 - sqrt(part1 - part2))/2
    const X = toDoj ? Number(pool.balance_asset) : Number(pool.balance_doj) // input is asset if toDoj
    const Y = toDoj ? Number(pool.balance_doj) : Number(pool.balance_asset) // output is doj if toDoj
    const y = outputAmount
    const part1 = ((X*Y)/y - 2*X)
    const part2 = Math.pow(X, 2) * 4
    const result = part1 - (Math.sqrt((Math.pow(part1, 2) - part2)) / 2)
    return result
}
