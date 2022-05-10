import ArweaveAccount from "../accounts/arweave_account";
import { NetworkType } from "../types/interfaces/network";
import Arweave from "arweave";
import GQLResultInterface, {
  ArTxDataResult,
  GQLTransactionsResultInterface,
  InnerDataResult,
  OuterDataResult,
} from "./utils/gqlResult";
import moment from "moment";
import _ from "lodash";

export interface ReqVariables {
  ownersFilter: Array<string>;
  first: number;
  after?: string;
}

export default class ArweaveTxs extends ArweaveAccount {
  ownerHasNextPage: boolean | undefined;
  recipientHasNextPage: boolean | undefined;
  ownerCursor: string;
  recipientCursor: string;
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
    this.ownerHasNextPage = undefined;
    this.recipientHasNextPage = undefined;
    this.ownerCursor = "";
    this.recipientCursor = "";
  }

  convertDateToTimestamp(date: string) {
    const timestamp = moment(date).format("X"); // lowercase 'x' for timestamp in milliseconds
    return Number(timestamp);
  }

  convertTimestampToDate(timestamp: number) {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
  }

  convertISOtoUTC(date: string) {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
  }

  convertTimestampToDateFormat(timestamp: number) {
    const date = moment(
      this.convertISOtoUTC(this.convertTimestampToDate(timestamp * 1000))
    ).format("DD/MM/YYYY");
    return date;
  }

  convertTimestampToTimeFormat(timestamp: number) {
    const date = moment(
      this.convertISOtoUTC(this.convertTimestampToDate(timestamp * 1000))
    ).format("HH:mm:ss");
    return date;
  }

  async getTransactionsHistory(owner: string, limit?: number) {
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
    let txsDataFinal: ArTxDataResult = {
      outer: outerTxsData,
      inner: innerTxsData,
    };

    if (this.ownerHasNextPage === true || this.ownerHasNextPage === undefined) {
      txs = await this.getOwnersTxsQueryResult(this._arweave, ownerVariables);
      this.ownerHasNextPage = txs.pageInfo.hasNextPage;
      if (txs.edges.length > 0) {
        this.ownerCursor = txs.edges[txs.edges.length - 1].cursor;
        txs.edges.map((res) => {
          const outerResult: OuterDataResult = {
            timestamp: res.node.block.timestamp,
            transaction_hash: res.node.id,
            block: res.node.block.id,
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
          };
          outerTxsData.push(outerResult);

          const innerResult: InnerDataResult = {
            timestamp: res.node.block.timestamp,
            transaction_hash: res.node.id,
            block: res.node.block.id,
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
            signature: res.node.signature,
            block_hash: res.node.block.id,
          };
          innerTxsData.push(innerResult);
        });
      }
    }
    if (
      this.recipientHasNextPage === true ||
      this.recipientHasNextPage === undefined
    ) {
      txs = await this.getRecipientsTxsQueryResult(
        this._arweave,
        recipientVariables
      );
      this.recipientHasNextPage = txs.pageInfo.hasNextPage;
      if (txs.edges.length > 0) {
        this.recipientCursor = txs.edges[txs.edges.length - 1].cursor;
        txs.edges.map((res) => {
          const outerResult: OuterDataResult = {
            timestamp: res.node.block.timestamp,
            transaction_hash: res.node.id,
            block: res.node.block.id,
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
          };
          outerTxsData.push(outerResult);

          const innerResult: InnerDataResult = {
            timestamp: res.node.block.timestamp,
            transaction_hash: res.node.id,
            block: res.node.block.id,
            from: res.node.owner.address,
            to: res.node.recipient,
            value: res.node.quantity.ar,
            gas_price: res.node.fee.ar,
            date:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToDateFormat(res.node.block.timestamp)
                : "-",
            time:
              res.node.block.timestamp &&
              res.node.block.timestamp !== (null || undefined)
                ? this.convertTimestampToTimeFormat(res.node.block.timestamp)
                : "-",
            signature: res.node.signature,
            block_hash: res.node.block.id,
          };
          innerTxsData.push(innerResult);
        });
      }
    }
    if (outerTxsData !== []) {
      const outerLodash: OuterDataResult[] = _.orderBy(
        outerTxsData,
        "timestamp",
        "desc"
      );
      txsDataFinal.outer = outerLodash;
    }
    if (innerTxsData !== []) {
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
