import axios from "axios";
import {AssetsList, AssetsListResult, PriceConverterResult} from "./types";

export async function priceConvertor(api: string, amount: number, fromAsset: AssetsList, toAsset: AssetsList) {
    const response = await axios.get(`${api}/v2/tools/price-conversion`, {
        params: {
            'amount': `${amount}`,
            'symbol': fromAsset,
            'convert': toAsset
        },
        headers: {
            'X-CMC_PRO_API_KEY': '70da3ef3-b107-4036-8054-71a75015cbf7'
        }
    });

    if (response.status !== 200) {
        throw new Error(
            `Unable to retrieve prices from the endpoint.`
        );
    }

    const data: PriceConverterResult = response.data
    const values = Object.values(data.data[0].quote)
    return values[0].price
}

export async function getAssets(api: string) {
    const response = await axios.get(`${api}/v1/cryptocurrency/map`, {
        headers: {
            'X-CMC_PRO_API_KEY': '70da3ef3-b107-4036-8054-71a75015cbf7'
        }
    });

    if (response.status !== 200) {
        throw new Error(
            `Unable to retrieve assets list from the endpoint.`
        );
    }
    let resArrList: Array<string> = []
    const data: AssetsListResult = response.data
    data.data.map(res => {
        resArrList.push(res.symbol)
    })
    return resArrList
}
