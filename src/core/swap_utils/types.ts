export type PoolData = {
    balance_doj: string,
    balance_asset: string,
    asset: string,
    LP_units: string,
    pool_units: string,
    status: string,
    synth_units: string,
    synth_supply: string,
    pending_inbound_doj: string,
    pending_inbound_asset: string
    decimals?: number,
}

export type SwapFeeResult = {
    network_inbound: number,
    network_outbound: number,
    network_fee: number,
    exchange_fee: number,
    total_fee: number
}