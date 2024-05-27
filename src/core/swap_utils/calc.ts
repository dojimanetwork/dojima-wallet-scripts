export type PoolData = {
    assetBalance: number
    runeBalance: number
}

export const getSwapOutput = (inputAmount: number, pool: PoolData, toRune: boolean) => {
    // formula: (x * X * Y) / (x + X) ^ 2
    const x = inputAmount
    const X = toRune ? pool.assetBalance : pool.runeBalance // input is asset if toRune
    const Y = toRune ? pool.runeBalance : pool.assetBalance // output is rune if toRune
    const numerator = (x * X * Y)
    const denominator = Math.pow((x + X), 2)
    const result = numerator/denominator
    return result
}

export const getSwapOutputWithFee = (
    inputAmount: number,
    pool: PoolData,
    toRune: boolean,
    transactionFee: number
) => {
    // formula: getSwapOutput() - one RUNE
    const x = inputAmount
    const r = getSwapOutput(inputAmount, pool, toRune)
    const poolAfterTransaction: PoolData = toRune // used to get rune fee price after swap
        ? {
            assetBalance: pool.assetBalance + x, // add asset input amount to pool
            runeBalance: pool.runeBalance - r // get input price in RUNE and subtract from pool
        }
        : {
            runeBalance: pool.runeBalance + x, // add RUNE input amount to pool
            assetBalance: pool.assetBalance - r // get input price in RUNE and subtract from pool
        }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const runeFee = toRune ? transactionFee : getValueOfRuneInAsset(transactionFee, poolAfterTransaction) // toRune its one Rune else its asset(oneRune)
    const result = r - runeFee // remove oneRune, or remove asset(oneRune)

    return result
}

export const getSwapInput = (toRune: boolean, pool: PoolData, outputAmount: number) => {
    // formula: (((X*Y)/y - 2*X) - sqrt(((X*Y)/y - 2*X)^2 - 4*X^2))/2
    // (part1 - sqrt(part1 - part2))/2
    const X = toRune ? pool.assetBalance : pool.runeBalance // input is asset if toRune
    const Y = toRune ? pool.runeBalance : pool.assetBalance // output is rune if toRune
    const y = outputAmount
    const part1 = ((X*Y)/y - 2*X)
    const part2 = 4*Math.pow(X, 2)
    const result = (part1 - Math.pow((Math.pow(part1, 2) - part2), 0.5)) / 2
    return result
}

export const getSwapSlip = (inputAmount: number, pool: PoolData, toRune: boolean) => {
    // formula: (x) / (x + X)
    const x = inputAmount
    const X = toRune ? pool.assetBalance : pool.runeBalance // input is asset if toRune
    const result = (x) / (x + X)
    return result
}

export const getSwapFee = (inputAmount: number, pool: PoolData, toRune: boolean) => {
    // formula: (x * x * Y) / (x + X) ^ 2
    const x = inputAmount
    const X = toRune ? pool.assetBalance : pool.runeBalance // input is asset if toRune
    const Y = toRune ? pool.runeBalance : pool.assetBalance // output is rune if toRune
    const numerator = x * x * Y
    const denominator = Math.pow((x + X) , 2)
    const result = numerator / denominator
    return result
}

export const getValueOfAssetInRune = (inputAsset: number, pool: PoolData) => {
    // formula: ((a * R) / A) => R per A (Runeper$)
    const t = inputAsset
    const R = pool.runeBalance
    const A = pool.assetBalance
    const result = (t * R) / A
    return result
}

export const getValueOfRuneInAsset = (inputRune: number, pool: PoolData) => {
    // formula: ((r * A) / R) => A per R ($perRune)
    const r = inputRune
    const R = pool.runeBalance
    const A = pool.assetBalance
    const result = (r * A) / R
    return result
}

export const getDoubleSwapOutput = (inputAmount: number, pool1: PoolData, pool2: PoolData) => {
    // formula: getSwapOutput(pool1) => getSwapOutput(pool2)
    const r = getSwapOutput(inputAmount, pool1, true)
    const output = getSwapOutput(r, pool2, false)
    return output
}

export const getDoubleSwapOutputWithFee = (
    inputAmount: number,
    pool1: PoolData,
    pool2: PoolData,
    transactionFee: number
) => {
    // formula: (getSwapOutput(pool1) => getSwapOutput(pool2)) - runeFee
    const r = getSwapOutput(inputAmount, pool1, true)
    const output = getSwapOutput(r, pool2, false)
    const poolAfterTransaction: PoolData = {
        runeBalance: (pool2.runeBalance + r), // add RUNE output amount to pool
        assetBalance: (pool2.assetBalance - output) // subtract input amount from pool
    }
    const runeFee = getValueOfRuneInAsset(transactionFee, poolAfterTransaction) // asset(oneRune)
    const result = output - runeFee // remove asset(oneRune)
    return result
}

export const getDoubleSwapInput = (pool1: PoolData, pool2: PoolData, outputAmount: number) => {
    // formula: getSwapInput(pool2) => getSwapInput(pool1)
    const y = getSwapInput(false, pool2, outputAmount)
    const x = getSwapInput(true, pool1, y)
    return x
}

export const getDoubleSwapSlip = (inputAmount: number, pool1: PoolData, pool2: PoolData) => {
    // formula: getSwapSlip1(input1) + getSwapSlip2(getSwapOutput1 => input2)
    const swapSlip1 = getSwapSlip(inputAmount, pool1, true)
    const r = getSwapOutput(inputAmount, pool1, true)
    const swapSlip2 = getSwapSlip(r, pool2, false)
    const result = swapSlip1 + swapSlip2
    return result
}

export const getDoubleSwapFee = (inputAmount: number, pool1: PoolData, pool2: PoolData) => {
    // formula: getSwapFee1 + getSwapFee2
    const fee1 = getSwapFee(inputAmount, pool1, true)
    console.log('Fee 1 : ', fee1)
    const r = getSwapOutput(inputAmount, pool1, true)
    console.log('Output 1 : ', r)
    const fee2 = getSwapFee(r, pool2, false)
    console.log('Fee 2 : ', fee2)
    const fee1Asset = getValueOfRuneInAsset(fee1, pool2)
    console.log('Fee 1 asset : ', fee1Asset)
    const result = fee2 + fee1Asset
    return result
}

export const getValueOfAsset1InAsset2 = (inputAsset: number, pool1: PoolData, pool2: PoolData) => {
    // formula: (A2 / R) * (R / A1) => A2/A1 => A2 per A1 ($ per Asset)
    const oneAsset = 1
    // Note: All calculation needs to be done in `AssetAmount` (not `BaseAmount`)
    const A2perR = getValueOfRuneInAsset(oneAsset, pool2)
    const RperA1 = getValueOfAssetInRune(inputAsset, pool1)
    const result = A2perR * RperA1
    // transform result back from `AssetAmount` into `BaseAmount`
    return result
}
