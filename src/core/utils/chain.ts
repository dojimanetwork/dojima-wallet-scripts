export enum Chain {
    Avalanche = 'AVAX',
    Binance = 'BNB',
    Bitcoin = 'BTC',
    Ethereum = 'ETH',
    Hermes = 'D11K',
    Cosmos = 'GAIA',
}
export const AvalancheChain = Chain.Avalanche
export const BNBChain = Chain.Binance
export const BTCChain = Chain.Bitcoin
export const ETHChain = Chain.Ethereum
export const HermesChain = Chain.Hermes
export const CosmosChain = Chain.Cosmos

/**
 * Type guard to check whether string  is based on type `Chain`
 *
 * @param {string} c The chain string.
 * @returns {boolean} `true` or `false`
 */
export const isChain = (c: string): c is Chain => (Object.values(Chain) as string[]).includes(c)

export const isEnabledChain = (chain: Chain) => chain.includes(chain)

/**
 * Sees if one chain is equal to another chain
 *
 * @param a chain a
 * @param b chain b
 * @returns boolean: True if equal else False
 */
export const eqChain = (a: Chain, b: Chain) => {
    return a == b
}

/**
 * Convert chain to string.
 *
 * @param {Chain} chainId.
 * @returns {string} The string based on the given chain type.
 */
export const chainToString: ((chainId: Chain) => string) & Record<Chain, string> = Object.assign(
    (chainId: Chain) => {
        if (!(chainId in chainToString)) return 'unknown chain'
        return chainToString[chainId]
    },
    {
        [Chain.Avalanche]: 'Avalanche',
        [Chain.Hermes]: 'D11K',
        [Chain.Bitcoin]: 'Bitcoin',
        [Chain.Ethereum]: 'Ethereum',
        [Chain.Binance]: 'Binance Chain',
        [Chain.Cosmos]: 'Cosmos',
    },
)

/**
 * Check whether chain is BTC chain
 */
export const isBtcChain = (chain: Chain): boolean => eqChain(chain, BTCChain)

/**
 * Check whether chain is DOJ chain
 */
export const isHermesChain = (chain: Chain): boolean => eqChain(chain, HermesChain)

/**
 * Check whether chain is BNB chain
 */
export const isBnbChain = (chain: Chain): boolean => eqChain(chain, BNBChain)

/**
 * Check whether chain is ETH chain
 */
export const isEthChain = (chain: Chain): boolean => eqChain(chain, ETHChain)
