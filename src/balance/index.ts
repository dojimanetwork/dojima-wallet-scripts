import { SolanaChain } from "./solana"
import { PolkadotChain } from "./polkadot"
import { ArweaveChain } from "./arweave"
import { EthereumChain } from "./ethereum"
import BitcoinChain from "./bitcoin"
import Erc20TokenBalance from "./nonNativeTokens/getBalance"
const chains = {
    SolanaChain,
    PolkadotChain,
    ArweaveChain,
    EthereumChain,
    BitcoinChain,
    Erc20TokenBalance,
}

export { chains }