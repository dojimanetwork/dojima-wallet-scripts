export interface StatusResult {
    timestamp: string,
    error_code: number,
    error_message: any,
    elapsed: number,
    credit_count: number,
    notice: any
}

interface PriceConverterDataQuote {
    price: number,
    last_updated: string
}

export interface PriceConverterDataResult {
    id: number,
    symbol: string,
    name: string,
    amount: number,
    last_updated: string,
    quote: {
        [key in AssetsList]: PriceConverterDataQuote;
    };
}
export interface PriceConverterResult {
    status: StatusResult,
    data: Array<PriceConverterDataResult>
}

export interface AssetsListDataPlatformResult {
    id: number,
    name: string,
    symbol: string,
    slug: string,
    token_address: string
}

export interface AssetsListDataResult {
    id: number,
    name: string,
    symbol: string,
    slug: string,
    rank: number,
    displayTV: number,
    manualSetTV: number,
    tvCoinSymbol: string,
    is_active: number,
    first_historical_data: string,
    last_historical_data: string,
    platform: AssetsListDataPlatformResult | null
}

export interface AssetsListResult {
    status: StatusResult,
    data: Array<AssetsListDataResult>
}

export type AssetsList = 'AR' | 'BTC' | 'BNB' | 'ETH' | 'DOT' | 'SOL' | 'MATIC' | 'ATOM' | 'USD' | 'USDT' | 'USDC' | 'BUSD' | 'DOGE' | 'RUNE' | 'FTM' | 'AVAX' | 'DAI' | 'UNI' | 'SHIB' | 'LTC' | 'DOGE' | 'MKR' | 'AAVE'