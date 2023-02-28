import {ChainClientParams, Network} from "../client"
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";
import {derivePath} from "ed25519-hd-key";
import {GasfeeResult, SolTxData, SolTxParams, SolTxs, SolTxsHistoryParams} from "./types";
import {validatePhrase} from "../crypto";
import {baseToLamports, IDL, lamportsToBase, SOL_DECIMAL, SOLNodeWallet} from "./utils";
import {Program, Provider} from "@project-serum/anchor";
import {InboundAddressResult, SwapAssetList} from "../utils";
import axios from "axios";
import {
    calcDoubleSwapOutput,
    calcDoubleSwapSlip,
    calcSwapOutput,
    calcSwapSlip,
    PoolData,
    SwapFeeResult
} from "../swap_utils";
import {getPoolData} from "../pool_utils";

export interface SolanaChainClient {
    getCluster(): web3.Cluster,
    getAddress(index?: number): Promise<string>,
    getBalance(address: string): Promise<number>,
    getFees(): Promise<GasfeeResult>
    transfer(params: SolTxParams): Promise<string>,
    getTransactionData(txId: string, state?: web3.Finality): Promise<SolTxData>,
    getTransactionsHistory(params?: SolTxsHistoryParams): Promise<SolTxs>
}

export type ChainEndpointParams = {
    endpoint?: string
}

export const defaultSolEndpoint = 'mainnet-beta'

class SolanaClient implements SolanaChainClient {
    protected network: Network;
    protected cluster: web3.Cluster;
    protected connection: web3.Connection;
    protected phrase = ''

    constructor({
                    phrase,
                    network = Network.Mainnet,
                    endpoint = defaultSolEndpoint
    }: ChainClientParams & ChainEndpointParams) {
        if (phrase) {
            if (!validatePhrase(phrase)) {
                throw new Error('Invalid phrase')
            }
            this.phrase = phrase
        }
        this.network = network
        this.cluster = this.getCluster()
        if ((this.network === Network.DojTestnet) && endpoint === defaultSolEndpoint) {
            throw Error(`'endpoint' params can't be empty for 'doj-testnet'`)
        }
        if(this.network === Network.DojTestnet) {
            this.connection = new web3.Connection(endpoint, 'confirmed')
        } else {
            this.connection = new web3.Connection(web3.clusterApiUrl(this.cluster), 'confirmed')
        }
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

    /** Testnet tokens for solana */
    async requestSolTokens(faucetEndpoint: string, address: string): Promise<string> {
        const faucetConnection = new web3.Connection(`${faucetEndpoint}`, 'confirmed')
        const pubKey = new web3.PublicKey(address);
        const amt = baseToLamports(50, SOL_DECIMAL)
        const requestHash = await faucetConnection.requestAirdrop(pubKey, amt)
        return requestHash
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

    getSwapOutput(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, SOL_DECIMAL)
        return calcSwapOutput(input, pool, toDoj);
    }

    getDoubleSwapOutput(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, SOL_DECIMAL)
        return calcDoubleSwapOutput(input, pool1, pool2)
    }

    getSwapSlip(inputAmount: number, pool: PoolData, toDoj: boolean): number {
        const input = inputAmount * Math.pow(10, SOL_DECIMAL)
        return calcSwapSlip(input, pool, toDoj);
    }

    getDoubleSwapSlip(inputAmount: number, pool1: PoolData, pool2: PoolData): number {
        const input = inputAmount * Math.pow(10, SOL_DECIMAL)
        return calcDoubleSwapSlip(input, pool1, pool2)
    }

    async getSwapFeesData(): Promise<SwapFeeResult> {
        return
    }

    async getInboundObject(): Promise<InboundAddressResult> {
        const response = await axios.get(
            "https://api-test.h4s.dojima.network/hermeschain/inbound_addresses"
        );
        if (response.status !== 200) {
            throw new Error(
                `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
            );
        }

        const data: Array<InboundAddressResult> = response.data;
        const inboundObj = data.find(
            (res) => res.chain === "SOL"
        ) as InboundAddressResult;
        return inboundObj;
    }

    async getSolanaInboundAddress(): Promise<string> {
        const inboundObj = await this.getInboundObject();
        return inboundObj.address;
    }

    async getDefaultLiquidityPoolGasFee(): Promise<number> {
        const inboundObj = await this.getInboundObject();

        const gasFee = Number(inboundObj.gas_rate) / Math.pow(10, SOL_DECIMAL);

        return gasFee;
    }

    async getProvider() {
        const opts: web3.ConfirmOptions = {
            preflightCommitment: 'processed'
        }
        // const provider = new Provider(this.connection, new Wallet((await this.getKeypair())[0]), opts);
        const provider = new Provider(this.connection, new SOLNodeWallet((await this.getKeypair())[0]), opts);
        return provider;
    }

    async solanaBatchTxsToHermes(amount: number, recipient: string, memo: string) {
        const provider = await this.getProvider()
        const programIDPPubKey = new web3.PublicKey('2dkwKCkTQz4xXxyjcvhUYdSb5fb3Bw15ra95o94WkyVo');
        const program = new Program(IDL, programIDPPubKey, provider);
        const fromWallet = await this.getKeypair()
        const swapHash = await program.rpc.transferNativeTokens(`${amount}`, memo, {
            accounts: {
                from: fromWallet[0].publicKey,
                to: new web3.PublicKey(recipient),
                systemProgram: web3.SystemProgram.programId,
            },
            signers: [fromWallet[0]],
        });
        // await this.connection.confirmTransaction(swapHash);
        return swapHash;
    }

    async dummyTx(recipient: string, amount: number): Promise<string> {
        const toAmount = baseToLamports(amount, SOL_DECIMAL)
        const memo = `NOOP:NOVAULT`
        const poolHash = await this.solanaBatchTxsToHermes(toAmount, recipient, memo);
        // await this.connection.confirmTransaction(swapHash);
        return poolHash;
    }

    async addLiquidityPool(
        amount: number,
        inboundAddress: string,
        dojAddress?: string
    ) {
        const toAmount = baseToLamports(amount, SOL_DECIMAL)
        const memo = dojAddress
            ? `ADD:SOL.SOL:${dojAddress}`
            : `ADD:SOL.SOL`;
        const poolHash = await this.solanaBatchTxsToHermes(toAmount, inboundAddress, memo);
        // await this.connection.confirmTransaction(swapHash);
        return poolHash;
    }

    async swap(
        amount: number,
        token: SwapAssetList,
        inboundAddress: string,
        recipient: string
    ) {
        const fromPool = await getPoolData('SOL.SOL')
        const toPool = await getPoolData(token)
        const swapOutput = this.getDoubleSwapOutput(amount, fromPool, toPool)
        console.log('Swap output : ', swapOutput)
        const toAmount = baseToLamports(amount, SOL_DECIMAL)
        const memo = `SWAP:${token}:${recipient}`
        const swapHash = await this.solanaBatchTxsToHermes(toAmount, inboundAddress, memo);
        // await this.connection.confirmTransaction(swapHash);
        return swapHash;
    }
}

export { SolanaClient }