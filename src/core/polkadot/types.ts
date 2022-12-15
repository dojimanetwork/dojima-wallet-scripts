import {SubmittableExtrinsic} from "@polkadot/api/types";
import {ISubmittableResult} from "@polkadot/types/types";

export type rawTxType = SubmittableExtrinsic<"promise", ISubmittableResult>

export type PolkaTxParams = {
    recipient: string,
    amount: number
}

export type GasfeeResult = {
    slow: number;
    average: number;
    fast: number;
}