import { throwNotImplemented } from "../index";
import { BaseBigNumber } from "../abstracts";

export class EmptyBigNumber extends BaseBigNumber {
  constructor(value: any) {
    super();
  }

  toString(base?: number) {
    return throwNotImplemented<string>();
  }

  toNumber() {
    return throwNotImplemented<number>();
  }

  toBuffer(base?: any) {
    return throwNotImplemented<Buffer>();
  }

  add(value: BaseBigNumber) {
    return throwNotImplemented<BaseBigNumber>();
  }

  sub(value: BaseBigNumber) {
    return throwNotImplemented<BaseBigNumber>();
  }

  mul(value: BaseBigNumber) {
    return throwNotImplemented<BaseBigNumber>();
  }

  div(value: BaseBigNumber) {
    return throwNotImplemented<BaseBigNumber>();
  }

  lte(value: BaseBigNumber) {
    return throwNotImplemented<boolean>();
  }

  lt(value: BaseBigNumber) {
    return throwNotImplemented<boolean>();
  }

  gte(value: BaseBigNumber) {
    return throwNotImplemented<boolean>();
  }

  gt(value: BaseBigNumber) {
    return throwNotImplemented<boolean>();
  }

  eq(value: BaseBigNumber) {
    return throwNotImplemented<boolean>();
  }
}
