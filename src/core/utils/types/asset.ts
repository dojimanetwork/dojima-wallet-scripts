import { Chain } from '../chain'

export type Asset = {
    chain: Chain
    symbol: string
    ticker: string
    synth: boolean
}

export type SwapAssetList = 'AR.AR' | 'BTC.BTC' | 'BNB.BNB' | 'D11K.DOJ' | 'DOT.DOT' | 'ETH.ETH' | 'SOL.SOL'

export type InboundAddressResult = {
    chain: string,
    pub_key: string,
    address: string,
    halted: boolean,
    gas_rate: string
    router?: string,
}