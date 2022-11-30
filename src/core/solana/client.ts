import {ChainClientParams, Network} from "@d11k-ts/client"
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";
import {derivePath} from "ed25519-hd-key";
import {GasfeeResult, SolTxData, SolTxParams, SolTxs, SolTxsHistoryParams} from "./types";
import {validatePhrase} from "@d11k-ts/crypto";
import {SOL_DECIMAL, lamportsToBase, baseToLamports} from "./utils";

export interface SolanaChainClient {
    getCluster(): web3.Cluster,
    getAddress(index?: number): Promise<string>,
    getBalance(address: string): Promise<number>,
    getFees(): Promise<GasfeeResult>
    transfer(params: SolTxParams): Promise<string>,
    getTransactionData(txId: string, state?: web3.Finality): Promise<SolTxData>,
    getTransactionsHistory(params?: SolTxsHistoryParams): Promise<SolTxs>
}

class SolanaClient implements SolanaChainClient {
    protected network: Network;
    protected cluster: web3.Cluster;
    protected connection: web3.Connection;
    protected phrase = ''

    constructor({
                    phrase,
                    network = Network.Mainnet
    }: ChainClientParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase')
            }
            this.phrase = phrase
        }
        this.network = network
        this.cluster = this.getCluster()
        this.connection = new web3.Connection(
            web3.clusterApiUrl(this.cluster),
            "confirmed"
        );
    }

    getCluster(): web3.Cluster {
        switch (this.network) {
            case Network.Mainnet:
                return "mainnet-beta"
            case Network.Stagenet:
                return "devnet"
            case Network.Testnet:
                return "testnet"
        }
    }

    private async getKeypair(): Promise<web3.Keypair[]> {
        const seed = bip39.mnemonicToSeedSync(`${this.phrase}`, ""); // (mnemonic, password)
        const keyPairResult: web3.Keypair[] = [];
        for (let i = 0; i < 10; i++) {
            const path = `m/44'/501'/${i}'/0'`;
            const keypair = web3.Keypair.fromSeed(
                derivePath(path, seed.toString("hex")).key
            );
            keyPairResult.push(keypair);
        }
        return keyPairResult;
    }

    async getAddress(index = 0): Promise<string> {
        const keypair = await this.getKeypair();
        const address = keypair[index].publicKey.toBase58();
        return address;
    }

    async getBalance(address: string): Promise<number> {
        // Get account details
        const pubKey = new web3.PublicKey(address);

        // Retrieve user token balance
        let balance = await this.connection.getBalance(pubKey);
        balance = lamportsToBase(balance, SOL_DECIMAL);
        return balance;
    }

    // Calculate Gas fee based in recent block hash
    async getFees(): Promise<GasfeeResult> {
        const { feeCalculator } = await this.connection.getRecentBlockhash();
        const sol_gasFee = lamportsToBase(feeCalculator.lamportsPerSignature, SOL_DECIMAL);
        return {
            slow: sol_gasFee,
            average: sol_gasFee,
            fast: sol_gasFee,
        };
    }

    // Create transaction details based on user input
    async createTransaction(
        walletIndex = 0,
        recipient: string,
        amount: number
    ): Promise<web3.Transaction> {
        // Get account address
        const fromPubkey = new web3.PublicKey(await this.getAddress(walletIndex));

        // Convert recipient string to PublicKey
        const toPubkey = new web3.PublicKey(recipient);

        const toAmount = baseToLamports(amount, SOL_DECIMAL);

        // Add transaction for the required amount
        let rawTx = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey,
                toPubkey,
                lamports: toAmount,
            })
        );

        return rawTx;
    }

    async signAndSend(walletIndex = 0, rawTx: web3.Transaction): Promise<string> {
        // Get account details
        const account = await this.getKeypair();

        // Sign the transaction
        let signature = await web3.sendAndConfirmTransaction(
            this.connection,
            rawTx,
            [account[walletIndex]]
        );

        return signature;
    }

    async transfer({walletIndex = 0, recipient, amount}: SolTxParams): Promise<string> {
        const rawTx = await this.createTransaction(walletIndex, recipient, amount);
        const txHash = await this.signAndSend(walletIndex, rawTx);

        if (!txHash) throw Error(`Invalid transaction hash: ${txHash}`)

        return txHash
    }

    async getTransactionData(txId: string, state?: web3.Finality): Promise<SolTxData> {
        let txData = await this.connection.getTransaction(txId, {
            commitment: state ? state : "confirmed",
        });
        if (txData !== null && txData.meta !== null) {
            const amount = txData.meta.postBalances[1] - txData.meta.preBalances[1]

            /** For date and time make use of these */

                // const convertTSToDate = (timestamp: number) => {
                //     const date = moment(
                //         convertISOtoUTC(
                //             convertTimestampToDate(timestamp * 1000)
                //         )
                //     ).format("DD/MM/YYYY");
                //     return date;
                // };
                //
                // const convertTSToTime = (timestamp: number) => {
                //     const date = moment(
                //         convertISOtoUTC(
                //             convertTimestampToDate(timestamp * 1000)
                //         )
                //     ).format("HH:mm:ss");
                //     return date;
                // };

            const resultData: SolTxData = {
                    transaction_hash: txId,
                    timeStamp: txData.blockTime ? txData.blockTime : 0,
                    gasFee: lamportsToBase(txData.meta.fee, SOL_DECIMAL),
                    amount: lamportsToBase(amount, SOL_DECIMAL),
                    block: txData.slot,
                    from: txData.transaction.message.accountKeys[0].toString(),
                    to: txData.transaction.message.accountKeys[1].toString(),
                    recentBlockHash: txData.transaction.message.recentBlockhash,
                    instructionData: txData.transaction.message.instructions[0].data,
                }
            return resultData
        } else {
            throw new Error(`Failed to get transaction data (tx-hash: ${txId})`)
        }
    }

    async getTransactionsHistory(params?: SolTxsHistoryParams): Promise<SolTxs> {
        const limit = params?.offset || 100
        const before = params?.beforeHash || undefined
        const until = params?.untilHash || undefined

        const pubKey = new web3.PublicKey(params.address);
        let signatures = await this.connection.getSignaturesForAddress(
            pubKey,
            {
                limit,
                before,
                until,
            }
        );

        if (!signatures) throw new Error(`Failed to get transactions list (address: ${params.address})`)

        const resultTxs: SolTxs = {
            total: signatures.length,
            txs: await Promise.all(signatures.map(({ signature }) => this.getTransactionData(signature))),
        };
        return resultTxs;
    }
}

export { SolanaClient }