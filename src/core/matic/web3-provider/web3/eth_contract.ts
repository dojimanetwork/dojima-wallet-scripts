import { BaseContract, Logger } from "../../client";
import Contract from "web3/eth/contract";
import { EthMethod } from "./eth_method";

export class Web3Contract extends BaseContract {
    contract: Contract;

    constructor(address: string, contract: Contract, logger: Logger) {
        super(address, logger);
        this.contract = contract;
    }

    // @ts-ignore
    method(methodName: string, ...args) {
        this.logger.log("methodName", methodName, "args method", arguments);
        return new EthMethod(
            this.address, this.logger, this.contract.methods[methodName](...args)
        );
    }
}