import { BaseBigNumber } from "../abstracts";
import { utils } from "./index";

export class Converter {
  static toHex(amount: BaseBigNumber | string | number) {
    const dataType = typeof amount;
    console.log(dataType + ' :: ', amount)
    if (dataType === "number") {
      amount = new utils.BN(amount);
    } else if (dataType === "string") {
      if ((amount as string).slice(0, 2) === "0x") {
        return amount;
      }
      amount = new utils.BN(amount);
    }
    console.log('Amount :: ', amount)
    console.log(utils.BN.isBN(amount))
    console.log("0x" + amount.toString(16))
    if (utils.BN.isBN(amount)) {
      return "0x" + amount.toString(16);
    } else {
      throw new Error(`Invalid value ${amount}, value is not a number.`);
    }
  }
}
