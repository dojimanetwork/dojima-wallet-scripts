import {
  ActorResultType,
  AllHandlesResultType,
  AllTokenMappedPubAddressType,
  FioClientParams,
  GenerateKeysType,
  HandleRegisteredType,
  TokenBalanceResultType,
  TokenMappedPubAddressType,
} from "./types";
import { Network } from "../client";
import { validatePhrase } from "../crypto";

const { FIOSDK } = require("@fioprotocol/fiosdk");

class FioClient {
  protected network: Network;
  protected phrase = "";
  private accountDetails: GenerateKeysType | null = null;
  private readonly fetchJson = async (uri: string, opts = {}) =>
    fetch(uri, opts);
  protected apiUrl: string;

  constructor({ phrase, network, apiUrl }: FioClientParams) {
    this.network = network;
    if (phrase) {
      if (!validatePhrase(phrase)) {
        throw new Error("Invalid phrase");
      }
      this.phrase = phrase;
    }
    this.apiUrl = apiUrl;
  }

  private async generateKeysFromMnemonic(): Promise<GenerateKeysType> {
    if (!this.accountDetails) {
      const keyRes = await FIOSDK.createPrivateKeyMnemonic(this.phrase);
      const privateKey: string = keyRes.fioKey;
      const publicKey: string = FIOSDK.derivedPublicKey(privateKey).publicKey;
      const account: string = FIOSDK.accountHash(publicKey).accountnm;

      this.accountDetails = { privateKey, publicKey, account };
    }
    return this.accountDetails;
  }

  async getAddress(): Promise<string> {
    const { publicKey } = await this.generateKeysFromMnemonic();
    return publicKey;
  }

  async getAccountName(): Promise<string> {
    const { account } = await this.generateKeysFromMnemonic();
    return account;
  }

  private async postRequest<T>(url: string, body: object): Promise<T> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async isHandleRegistered(
    handle: string
  ): Promise<HandleRegisteredType | string> {
    try {
      return await this.postRequest<HandleRegisteredType>(
        `${this.apiUrl}chain/avail_check`,
        { fio_name: handle }
      );
    } catch (err) {
      return `Unable to check handle availability`;
    }
  }

  async getFee(handle: string): Promise<{ fee: number } | string> {
    try {
      return await this.postRequest<{ fee: number }>(
        `${this.apiUrl}chain/get_fee`,
        {
          end_point: "transfer_tokens_pub_key",
          fio_address: handle ? handle : "",
        }
      );
    } catch (err) {
      return `Unable to get fee`;
    }
  }

  async generateDojimaHandle(
    handle: string,
    pubAddress: string,
    apiKey: string,
    referralCode: string
  ) {
    try {
      return await this.postRequest(
        "https://reg.fioprotocol.io/public-api/buy-address",
        {
          address: handle,
          referralCode: referralCode,
          apiToken: apiKey,
          publicKey: pubAddress,
        }
      );
    } catch (err) {
      throw new Error(`Unable to generate Dojima handle`);
    }
  }

  private async pushTransaction(
    action: string,
    contract: string,
    actionData: object
  ) {
    const accountDetails = await this.generateKeysFromMnemonic();
    const user = new FIOSDK(
      accountDetails.privateKey,
      accountDetails.publicKey,
      this.apiUrl,
      this.fetchJson
    );

    try {
      return await user.genericAction("pushTransaction", {
        action,
        account: contract,
        data: actionData,
      });
    } catch (err) {
      console.error("Error: ", err);
      if (err.json && err.json.fields) {
        console.error("Fields: ", err.json.fields);
      }
      throw err;
    }
  }

  async mapTokenPublicAddresses(
    handle: string,
    chain: string,
    token: string,
    tokenPubAddress: string
  ) {
    const actionData = {
      fio_address: handle,
      public_addresses: [
        {
          chain_code: chain,
          token_code: token,
          public_address: tokenPubAddress,
        },
      ],
      max_fee: 10000000000000,
      tpid: "",
      actor: (await this.generateKeysFromMnemonic()).account,
    };
    return this.pushTransaction("addaddress", "fio.address", actionData);
  }

  async removeMappedTokenPublicAddresses(
    handle: string,
    chain: string,
    token: string,
    tokenPubAddress: string
  ) {
    const actionData = {
      fio_address: handle,
      public_addresses: [
        {
          chain_code: chain,
          token_code: token,
          public_address: tokenPubAddress,
        },
      ],
      max_fee: 10000000000000,
      tpid: "",
      actor: (await this.generateKeysFromMnemonic()).account,
    };
    return this.pushTransaction("remaddress", "fio.address", actionData);
  }

  async removeAllMappedTokenPublicAddresses(handle: string) {
    const actionData = {
      fio_address: handle,
      max_fee: 10000000000000,
      tpid: "",
      actor: (await this.generateKeysFromMnemonic()).account,
    };
    return this.pushTransaction("remalladdr", "fio.address", actionData);
  }

  async getTokenMappedPubAddrForHandle(
    handle: string,
    chain: string,
    token: string
  ) {
    return this.postRequest<TokenMappedPubAddressType>(
      `${this.apiUrl}chain/get_pub_address`,
      {
        fio_address: handle,
        chain_code: chain,
        token_code: token,
      }
    );
  }

  async getAllMappedPubAddrForHandle(handle: string, limit?: number) {
    return this.postRequest<AllTokenMappedPubAddressType>(
      `${this.apiUrl}chain/get_pub_addresses`,
      {
        fio_address: handle,
        limit: limit ? limit : 0,
      }
    );
  }

  async getHandleDetails() {
    return this.postRequest<AllHandlesResultType>(
      `${this.apiUrl}chain/get_fio_addresses`,
      {
        fio_public_key: await this.getAddress(),
      }
    );
  }

  async getBalance() {
    const result = await this.postRequest<TokenBalanceResultType>(
      `${this.apiUrl}chain/get_fio_balance`,
      {
        fio_public_key: await this.getAddress(),
      }
    );
    return {
      balance: result.balance / Math.pow(10, 9),
      available: result.available / Math.pow(10, 9),
      staked: result.staked / Math.pow(10, 9),
      srps: result.srps / Math.pow(10, 9),
      roe: result.roe,
    };
  }

  async getActor() {
    return this.postRequest<ActorResultType>(`${this.apiUrl}chain/get_actor`, {
      fio_public_key: await this.getAddress(),
    });
  }

  async transfer(to: string, amount: number, tpId?: string) {
    const actionData = {
      payee_public_key: to,
      amount: amount * Math.pow(10, 9),
      max_fee: 10000000000000,
      tpid: tpId ? tpId : "",
      actor: (await this.generateKeysFromMnemonic()).account,
    };
    return this.pushTransaction("trnsfiopubky", "fio.token", actionData);
  }
}

export { FioClient };

// import {
//     ActorResultType,
//     AllHandlesResultType,
//     AllTokenMappedPubAddressType,
//     FioClientParams,
//     GenerateKeysType,
//     HandleRegisteredType, TokenBalanceResultType,
//     TokenMappedPubAddressType
// } from "./types";
// import {Network} from "../client";
// import {validatePhrase} from "../crypto";
//
// const {FIOSDK} = require('@fioprotocol/fiosdk')
//
// export default class FioClient {
//     protected network: Network;
//     protected rpcUrl: string;
//     protected phrase = "";
//
//     constructor({phrase, network, rpcUrl}: FioClientParams) {
//         this.network = network;
//         if (phrase) {
//             if (!validatePhrase(phrase)) {
//                 throw new Error("Invalid phrase");
//             }
//             this.phrase = phrase;
//         }
//         this.rpcUrl = rpcUrl;
//     }
//
//     private async generateKeysFromMnemonic(): Promise<GenerateKeysType> {
//         const keyRes = await FIOSDK.createPrivateKeyMnemonic(this.phrase);
//         const pvtKey: string = keyRes.fioKey;
//
//         const pubKey: string = FIOSDK.derivedPublicKey(pvtKey).publicKey;
//
//         const account: string = FIOSDK.accountHash(pubKey).accountnm;
//
//         return {
//             privateKey: pvtKey,
//             publicKey: pubKey,
//             account: account
//         }
//     }
//
//     async getAddress(): Promise<string> {
//         const accountDetails = await this.generateKeysFromMnemonic();
//
//         return accountDetails.publicKey;
//     }
//
//     async getAccountName(): Promise<string> {
//         const accountDetails = await this.generateKeysFromMnemonic();
//
//         return accountDetails.account;
//     }
//
//     async checkHandleAvailability(handle: string) {
//         const options = {
//             method: "POST",
//             headers: {accept: "application/json", "content-type": "application/json"},
//             body: JSON.stringify({fio_name: handle}),
//         };
//
//         try {
//             const response = await fetch("https://fio.blockpane.com/v1/chain/avail_check", options);
//             if (!response.ok) {
//                 // throw new Error(`HTTP error! status: ${response.status}`);
//                 return `Unable to check handle availability : ${response.status}`;
//             }
//             const result: HandleRegisteredType = await response.json();
//             return result;
//         } catch (err) {
//             // console.error(err);
//             // throw err; // Re-throw the error to allow the caller to handle it
//             return 'Unable to check handle availability';
//         }
//     }
//
//     async generateDojimaHandle(handleName: string, pubAddress: string, apiKey: string, referralCode: string) {
//         const options = {
//             method: "POST",
//             headers: {accept: "application/json", "content-type": "application/json"},
//             body: JSON.stringify({
//                 address: handleName,
//                 referralCode: referralCode,
//                 apiToken: apiKey,
//                 publicKey: pubAddress,
//             }),
//         };
//
//         try {
//             const response = await fetch("https://reg.fioprotocol.io/public-api/buy-address", options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result = await response.json();
//             return result;
//         } catch (err) {
//             // console.error(err);
//             throw err; // Re-throw the error to allow the caller to handle it
//         }
//     }
//
//     async mapTokenPublicAddresses(handle: string, chain: string, token: string, tokenPubAddress: string) {
//         // Register FIO Handle Action
//         const action = 'addaddress'
//         const contract = 'fio.address'
//         const fetchJson = async (uri: string, opts = {}) => {
//             return fetch(uri, opts)
//         }
//
//         const apiNode = 'https://fio.blockpane.com/v1/'
//
//         const accountDetails = await this.generateKeysFromMnemonic();
//
// // Action parameters
//         const actionData =
//             {
//                 fio_address: handle,
//                 public_addresses: [
//                     {
//                         chain_code: chain,
//                         token_code: token,
//                         public_address: tokenPubAddress
//                     }
//                 ],
//                 max_fee: 10000000000000,
//                 tpid: '',
//                 actor: accountDetails.account
//             }
//
// // Push transaction
//         const user = new FIOSDK(
//             accountDetails.privateKey,
//             accountDetails.publicKey,
//             apiNode,
//             fetchJson
//         )
//         try {
//             const result = await user.genericAction('pushTransaction', {
//                 action: action,
//                 account: contract,
//                 data: actionData
//             })
//             console.log('Result: ', result);
//             // {
//             //     "status": "OK",
//             //     "fee_collected": 1000000000000
//             // }
//             return result;
//         } catch (err) {
//             console.log('Error: ', err)
//             console.log('Fields: ', err.json.fields)
//         }
//     }
//
//     async removeMappedTokenPublicAddresses(handle: string, chain: string, token: string, tokenPubAddress: string) {
//         // Register FIO Handle Action
//         const removeAction = 'remaddress'
//         const contract = 'fio.address'
//         const fetchJson = async (uri: string, opts = {}) => {
//             return fetch(uri, opts)
//         }
//
//         const apiNode = 'https://fio.blockpane.com/v1/'
//
//         const accountDetails = await this.generateKeysFromMnemonic();
//
// // Action parameters
//         const actionData =
//             {
//                 fio_address: handle,
//                 public_addresses: [
//                     {
//                         chain_code: chain,
//                         token_code: token,
//                         public_address: tokenPubAddress
//                     }
//                 ],
//                 max_fee: 10000000000000,
//                 tpid: '',
//                 actor: accountDetails.account
//             }
//
// // Push transaction
//         const user = new FIOSDK(
//             accountDetails.privateKey,
//             accountDetails.publicKey,
//             apiNode,
//             fetchJson
//         )
//         try {
//             const result = await user.genericAction('pushTransaction', {
//                 action: removeAction,
//                 account: contract,
//                 data: actionData
//             })
//             console.log('Result: ', result);
//             // {
//             //     "status": "OK",
//             //     "fee_collected": 1000000000000
//             // }
//             return result;
//         } catch (err) {
//             console.log('Error: ', err)
//             console.log('Fields: ', err.json.fields)
//         }
//     }
//
//     async removeAllMappedTokenPublicAddresses(handle: string) {
//         // Register FIO Handle Action
//         const removeAllAction = 'remalladdr'
//         const contract = 'fio.address'
//         const fetchJson = async (uri: string, opts = {}) => {
//             return fetch(uri, opts)
//         }
//
//         const apiNode = 'https://fio.blockpane.com/v1/'
//
//         const accountDetails = await this.generateKeysFromMnemonic();
//
// // Action parameters
//         const removeAllData = {
//             fio_address: handle,
//             max_fee: 10000000000000,
//             tpid: '',
//             actor: accountDetails.account
//         };
//
// // Push transaction
//         const user = new FIOSDK(
//             accountDetails.privateKey,
//             accountDetails.publicKey,
//             apiNode,
//             fetchJson
//         )
//         try {
//             const result = await user.genericAction('pushTransaction', {
//                 action: removeAllAction,
//                 account: contract,
//                 data: removeAllData
//             })
//             console.log('Result: ', result);
//             // {
//             //     "status": "OK",
//             //     "fee_collected": 1000000000000
//             // }
//             return result;
//         } catch (err) {
//             console.log('Error: ', err)
//             console.log('Fields: ', err.json.fields)
//         }
//     }
//
//     async getTokenMappedPubAddrForHandle(handle: string, chain: string, token: string) {
//         const options: RequestInit = {
//             method: "POST",
//             headers: {
//                 accept: "application/json",
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({
//                 fio_address: handle,
//                 chain_code: chain,
//                 token_code: token
//             })
//         };
//
//         try {
//             const response = await fetch("https://fio.blockpane.com/v1/chain/get_pub_address", options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result: TokenMappedPubAddressType = await response.json();
//             return result;
//         } catch (err) {
//             console.error(err);
//             throw err; // Re-throw the error to allow the caller to handle it
//         }
//     }
//
//     async getAllMappedPubAddrForHandle(handle: string, limit?: number) {
//         const options: RequestInit = {
//             method: "POST",
//             headers: {
//                 accept: "application/json",
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({ fio_address: handle, limit: limit ? limit : 0})
//         };
//
//         try {
//             const response = await fetch("https://fio.blockpane.com/v1/chain/get_pub_addresses", options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result: AllTokenMappedPubAddressType = await response.json();
//             return result;
//         } catch (err) {
//             console.error(err);
//             throw err; // Re-throw the error to allow the caller to handle it
//         }
//     }
//
//     async getHandleDetails() {
//         const options: RequestInit = {
//             method: "POST",
//             headers: { accept: "application/json", "content-type": "application/json" },
//             body: JSON.stringify({
//                 fio_public_key: this.getAddress(),
//             }),
//         };
//
//         try {
//             const response = await fetch("https://fio.blockpane.com/v1/chain/get_fio_addresses", options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result: AllHandlesResultType = await response.json();
//             return result;
//         } catch (err) {
//             console.error(err);
//             throw err; // Re-throw the error to allow the caller to handle it
//         }
//     }
//
//     async getBalance() {
//         const options: RequestInit = {
//             method: "POST",
//             headers: { accept: "application/json", "content-type": "application/json" },
//             body: JSON.stringify({
//                 fio_public_key: this.getAddress(),
//             }),
//         };
//
//         try {
//             const response = await fetch("https://fio.blockpane.com/v1/chain/get_fio_balance", options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result: TokenBalanceResultType = await response.json();
//             const updatedResult: TokenBalanceResultType = {
//                 balance: result.balance / Math.pow(10, 9),
//                 available: result.available / Math.pow(10, 9),
//                 staked: result.staked / Math.pow(10, 9),
//                 srps: result.srps / Math.pow(10, 9),
//                 roe: result.roe
//             }
//             return updatedResult;
//         } catch (err) {
//             console.error(err);
//             throw err; // Re-throw the error to allow the caller to handle it
//         }
//     }
//
//     async getActor() {
//         const options: RequestInit = {
//             method: "POST",
//             headers: { accept: "application/json", "content-type": "application/json" },
//             body: JSON.stringify({
//                 fio_public_key: this.getAddress(),
//             }),
//         };
//
//         try {
//             const response = await fetch("https://fio.blockpane.com/v1/chain/get_actor", options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result: ActorResultType = await response.json();
//             return result;
//         } catch (err) {
//             console.error(err);
//             throw err; // Re-throw the error to allow the caller to handle it
//         }
//     }
//
//     async transfer(to: string, amount: number, tpId?: string) {
//         const transferAction = 'trnsfiopubky'
//         const contract = 'fio.token'
//         const fetchJson = async (uri: string, opts = {}) => {
//             return fetch(uri, opts)
//         }
//
//         const apiNode = 'https://fio.blockpane.com/v1/'
//
//         const accountDetails = await this.generateKeysFromMnemonic();
//
//         const transferActionData =
//             {
//                 payee_public_key: to,// add payee fio public-key
//                 amount: amount * Math.pow(10, 9),
//                 max_fee: 10000000000000,
//                 tpid: tpId ? tpId : '',
//                 actor: accountDetails.account
//             }
//
// // Push transaction
//         const user = new FIOSDK(
//             accountDetails.privateKey,
//             accountDetails.publicKey,
//             apiNode,
//             fetchJson
//         )
//         try {
//             const result = await user.genericAction('pushTransaction', {
//                 action: transferAction,
//                 account: contract,
//                 data: transferActionData
//             })
//             console.log('Result: ', result);
//             // {
//             //     "status": "OK",
//             //     "fee_collected": 1000000000000
//             // }
//             return result;
//         } catch (err) {
//             console.log('Error: ', err)
//             console.log('Fields: ', err.json.fields)
//         }
//     }
// }
