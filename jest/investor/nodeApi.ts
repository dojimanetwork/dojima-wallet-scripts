import axios from "axios";
import {NodeAddressObject} from "./types";

export async function getNodeProviderDetails(nodeAddress: string) {
    const apiUrl = `https://api-dev.h4s.dojima.network/hermeschain/node/${nodeAddress}`;
    // const apiUrl = `http://localhost:1317/hermeschain/node/${nodeAddress}`;
    try {
        const response = await axios.get(apiUrl);

        return response.data as NodeAddressObject;
    } catch (error) {
        // Handle errors
        // console.error("Error fetching node address data:", error);
        // throw error;
        return null
    }
}