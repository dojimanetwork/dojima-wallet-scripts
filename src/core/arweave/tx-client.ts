import Arweave from "arweave";
import {
  GQLResultInterface,
  GQLTransactionsResultInterface,
  convertTimestampToDateFormat,
  convertTimestampToTimeFormat,
  AR_DECIMAL,
} from "./utils";
import _ from "lodash";
import Transaction from "arweave/node/lib/transaction";
import {
  ArTxDataResult,
  ArTxsResult,
  InnerDataResult,
  OuterDataResult,
} from "./types";

export interface ReqVariables {
  ownersFilter: Array<string>;
  first: number;
  after?: string;
}

export default class ArweaveTxClient {
  ownerHasNextPage: boolean | undefined;
  recipientHasNextPage: boolean | undefined;
  ownerCursor: string;
  recipientCursor: string;
  constructor() {
    this.ownerHasNextPage = undefined;
    this.recipientHasNextPage = undefined;
    this.ownerCursor = "";
    this.recipientCursor = "";
  }

  async getTxData(arweave: Arweave, hash: string): Promise<ArTxDataResult> {
    const tx: Transaction = await arweave.transactions.get(hash);

    if (!tx) throw Error(`Failed to get transaction data (tx-hash: ${hash})`);

    const fromAddress = await arweave.wallets.ownerToAddress(tx.owner);
    const resultData: ArTxDataResult = {
      transaction_hash: tx.id,
      from: fromAddress,
      to: tx.target,
      value: Number(tx.quantity) / Math.pow(10, AR_DECIMAL),
      gas_price: (Number(tx.reward) / Math.pow(10, AR_DECIMAL)).toFixed(
        AR_DECIMAL
      ),
      signature: tx.signature,
    };
    return resultData;
  }

  async getTxsHistory(arweave: Arweave, owner: string, limit?: number) {
    let ownerVariables: ReqVariables;
    if (this.ownerCursor !== "") {
      ownerVariables = {
        ownersFilter: [owner],
        first: limit ? limit : 100,
        after: this.ownerCursor,
      };
    } else {
      ownerVariables = {
        ownersFilter: [owner],
        first: limit ? limit : 100,
      };
    }

    let recipientVariables: ReqVariables;
    if (this.recipientCursor !== "") {
      recipientVariables = {
        ownersFilter: [owner],
        first: limit ? limit : 100,
        after: this.recipientCursor,
      };
    } else {
      recipientVariables = {
        ownersFilter: [owner],
        first: limit ? limit : 100,
      };
    }

    let txs: GQLTransactionsResultInterface;
    let outerTxsData: OuterDataResult[] = [];
    let innerTxsData: InnerDataResult[] = [];
    let txsDataFinal: ArTxsResult = {
      outer: outerTxsData,
      inner: innerTxsData,
    };

    if (this.ownerHasNextPage === true || this.ownerHasNextPage === undefined) {
      txs = await this.getOwnersTxsQueryResult(arweave, ownerVariables);
      this.ownerHasNextPage = txs.pageInfo.hasNextPage;
      if (txs.edges.length > 0) {
        this.ownerCursor = txs.edges[txs.edges.length - 1].cursor;
        txs.edges.map((res) => {
          const outerResult: OuterDataResult = {
            timestamp: res.node.block ? `${res.node.block.timestamp}` : "-",
            transaction_hash: res.node.id,
            block: res.node.block ? `${res.node.block.height}` : "-",
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
          };
          outerTxsData.push(outerResult);

          const innerResult: InnerDataResult = {
            timestamp: res.node.block ? `${res.node.block.timestamp}` : "-",
            transaction_hash: res.node.id,
            block: res.node.block ? `${res.node.block.height}` : "-",
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
            signature: res.node.signature,
            block_hash: res.node.block ? res.node.block.id : "-",
          };
          innerTxsData.push(innerResult);
        });
      }
    }
    if (
      this.recipientHasNextPage === true ||
      this.recipientHasNextPage === undefined
    ) {
      txs = await this.getRecipientsTxsQueryResult(arweave, recipientVariables);
      this.recipientHasNextPage = txs.pageInfo.hasNextPage;
      if (txs.edges.length > 0) {
        this.recipientCursor = txs.edges[txs.edges.length - 1].cursor;
        txs.edges.map((res) => {
          const outerResult: OuterDataResult = {
            timestamp: res.node.block ? `${res.node.block.timestamp}` : "-",
            transaction_hash: res.node.id,
            block: res.node.block ? `${res.node.block.height}` : "-",
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
          };
          outerTxsData.push(outerResult);

          const innerResult: InnerDataResult = {
            timestamp: res.node.block ? `${res.node.block.timestamp}` : "-",
            transaction_hash: res.node.id,
            block: res.node.block ? `${res.node.block.height}` : "-",
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block && res.node.block.timestamp !== undefined
                ? convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
            signature: res.node.signature,
            block_hash: res.node.block ? res.node.block.id : "-",
          };
          innerTxsData.push(innerResult);
        });
      }
    }
    if (outerTxsData.length !== 0) {
      const outerLodash: OuterDataResult[] = _.orderBy(
        outerTxsData,
        "timestamp",
        "desc"
      );
      txsDataFinal.outer = outerLodash;
    }
    if (innerTxsData.length !== 0) {
      const innerLodash: InnerDataResult[] = _.orderBy(
        innerTxsData,
        "timestamp",
        "desc"
      );
      txsDataFinal.inner = innerLodash;
    }
    return txsDataFinal;
  }

  async getOwnersTxsQueryResult(
    arweave: Arweave,
    variables: ReqVariables
  ): Promise<GQLTransactionsResultInterface> {
    const query = `query Transactions($ownersFilter: [String!], $first: Int!, $after: String) {
          transactions(owners: $ownersFilter, first: $first, sort: HEIGHT_ASC, after: $after) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                id
                owner { address }
                recipient
                block {
                  height
                  id
                  timestamp
                }
                fee { 
                  ar
                  winston 
                }
                quantity { 
                  ar
                  winston 
                }
                parent { id }
                signature
              }
              cursor
            }
          }
        }`;

    const response = await arweave.api.post("graphql", {
      query,
      variables,
    });

    if (response.status !== 200) {
      throw new Error(
        `Unable to retrieve transactions. Arweave gateway responded with status ${response.status}.`
      );
    }

    const data: GQLResultInterface = response.data;
    const txs = data.data.transactions;

    return txs;
  }

  async getRecipientsTxsQueryResult(
    arweave: Arweave,
    variables: ReqVariables
  ): Promise<GQLTransactionsResultInterface> {
    const query = `query Transactions($ownersFilter: [String!], $first: Int!, $after: String) {
          transactions(recipients: $ownersFilter, first: $first, sort: HEIGHT_ASC, after: $after) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                id
                owner { address }
                recipient
                tags {
                  name
                  value
                }
                block {
                  height
                  id
                  timestamp
                }
                fee { 
                  ar
                  winston 
                }
                quantity { 
                  ar
                  winston 
                }
                parent { id }
                signature
              }
              cursor
            }
          }
        }`;

    const response = await arweave.api.post("graphql", {
      query,
      variables,
    });

    if (response.status !== 200) {
      throw new Error(
        `Unable to retrieve transactions. Arweave gateway responded with status ${response.status}.`
      );
    }

    const data: GQLResultInterface = response.data;
    const txs: GQLTransactionsResultInterface = data.data.transactions;

    return txs;
  }
}
