export interface GQLPageInfoInterface {
  hasNextPage: boolean;
}

export interface GQLOwnerInterface {
  address: string;
  key: string;
}

export interface GQLAmountInterface {
  winston: string;
  ar: string;
}

export interface GQLMetaDataInterface {
  size: number;
  type: string;
}

export interface GQLTagInterface {
  name: string;
  value: string;
}

export interface GQLBlockInterface {
  id: string;
  timestamp: number;
  height: number;
  previous: string;
}

export interface GQLNodeInterface {
  id: string;
  anchor: string;
  signature: string;
  recipient: string;
  owner: GQLOwnerInterface;
  fee: GQLAmountInterface;
  quantity: GQLAmountInterface;
  data: GQLMetaDataInterface;
  tags: GQLTagInterface[];
  block: GQLBlockInterface;
  parent: {
    id: string;
  };
  bundledIn: {
    id: string;
  };
}

export interface GQLEdgeInterface {
  cursor: string;
  node: GQLNodeInterface;
}

export interface GQLTransactionsResultInterface {
  pageInfo: GQLPageInfoInterface;
  edges: GQLEdgeInterface[];
}

export default interface GQLResultInterface {
  data: {
    transactions: GQLTransactionsResultInterface;
  };
}

export interface ArTxDataResult {
  timestamp: number;
  outer: {
    transaction_hash: string;
    block: string;
    from: string;
    to: string;
    value: string;
    gas_price: string;
    date: string;
    time: string;
  };
  inner: {
    transaction_hash: string;
    block: string;
    from: string;
    to: string;
    value: string;
    gas_price: string;
    date: string;
    time: string;
    signature: string;
    block_hash: string;
  };
}
