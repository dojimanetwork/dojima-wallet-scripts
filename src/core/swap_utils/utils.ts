import { PoolData } from "./types";
import axios from "axios";
import {
    InboundAddressResult,
  SwapAssetList,
} from "../utils";

export async function getTestnetTokenPoolData(
  token: SwapAssetList
): Promise<PoolData> {
  const response = await axios.get(
    `https://api-test-h4s.dojima.network/hermeschain/pool/${token}`
  );
  // const response = await axios.get(
  //   `http://localhost:1317/hermeschain/pool/${token}`
  // );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve testnet pool data. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: PoolData = response.data;
  return data;
}

export async function getStagenetTokenPoolData(
  token: SwapAssetList
): Promise<PoolData> {
  const response = await axios.get(
    `https://api-h4s.dojima.network/hermeschain/pool/${token}`
  );
  // const response = await axios.get(
  //   `http://localhost:1317/hermeschain/pool/${token}`
  // );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve stagenet pool data. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: PoolData = response.data;
  return data;
}

export async function getTestnetInboundObject(
  chain: string
): Promise<InboundAddressResult> {
  const response = await axios.get(
    "https://api-test-h4s.dojima.network/hermeschain/inbound_addresses"
  );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve testnet inbound object. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: Array<InboundAddressResult> = response.data;
  const inboundObj: InboundAddressResult = data.find(
    (res) => res.chain === chain
  ) as InboundAddressResult;
  return inboundObj;
}

export async function getStagenetInboundObject(
  chain: string
): Promise<InboundAddressResult> {
  const response = await axios.get(
    "https://api-h4s.dojima.network/hermeschain/inbound_addresses"
  );
  if (response.status !== 200) {
    throw new Error(
      `Unable to retrieve stagenet inbound object. Dojima gateway responded with status ${response.status}.`
    );
  }

  const data: Array<InboundAddressResult> = response.data;
  const inboundObj: InboundAddressResult = data.find(
    (res) => res.chain === chain
  ) as InboundAddressResult;
  return inboundObj;
}
