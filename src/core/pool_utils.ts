import axios from "axios";

export async function getHashData(hash: string) {
    const response = await axios.get(`https://api-test.h4s.dojima.network/hermeschain/tx/${hash}`)
    if (response.status !== 200) {
        throw new Error(
            `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
        );
    }

    return response.data
}

export type PoolDataResult = {
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
    decimals: number
}

export async function getPoolData(token: string): Promise<PoolDataResult> {
    const response = await axios.get(`https://api-test.h4s.dojima.network/hermeschain/pool/${token}`)
    return response.data
}