import {PoolData} from "./types";
import axios from "axios";
import {SwapAssetList} from "../utils";

export async function getTokenPoolData(token: SwapAssetList): Promise<PoolData> {
    const response = await axios.get(`https://api-test.h4s.dojima.network/hermeschain/pool/${token}`)
    // const response = await axios.get(`http://localhost:1317/hermeschain/pool/${token}`)
    if (response.status !== 200) {
        throw new Error(
            `Unable to retrieve pool data. Dojima gateway responded with status ${response.status}.`
        );
    }

    const data: PoolData = response.data;
    return data
}