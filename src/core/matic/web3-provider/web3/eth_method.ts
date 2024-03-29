import { BaseContractMethod, Logger, ITransactionRequestConfig} from "../../client";
import Web3 from "web3";
import { TransactionObject} from "web3/eth/types";
import { TransactionWriteResult } from "../helpers";
import { maticTxRequestConfigToWeb3 } from "../utils";
import BN from 'bn.js';

export class EthMethod extends BaseContractMethod {

    constructor(public address: string, logger: Logger, private method: TransactionObject<any>) {
        super(logger);
    }

    toHex(value: string | number | BN) {
        return value != null ? Web3.utils.toHex(value) : value;
    }

    read<T>(tx: ITransactionRequestConfig, defaultBlock?: number | string): Promise<T> {
        this.logger.log("sending tx with config", tx, defaultBlock);
        return (this.method.call as any)(
            maticTxRequestConfigToWeb3(tx) as any, defaultBlock
        );
    }

    write(tx: ITransactionRequestConfig) {

        return new TransactionWriteResult(
            this.method.send(
                maticTxRequestConfigToWeb3(tx) as any
            )
        );
    }

    estimateGas(tx: ITransactionRequestConfig): Promise<number> {
        return this.method.estimateGas(
            maticTxRequestConfigToWeb3(tx) as any
        );
    }

    encodeABI() {
        return this.method.encodeABI();
    }

}