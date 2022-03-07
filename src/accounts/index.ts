import ArweaveAccount from "./arweave_account";
import BitcoinAccount from "./bitcoin_account";
import EthereumAccount from "./eth_account";
import PolkadotAccount from "./polkadot_account";
import SolanaAccount from "./solana_account";
import CreateAccount from "./create_account";

const accounts = { 
    ArweaveAccount,
    BitcoinAccount,
    EthereumAccount,
    PolkadotAccount,
    SolanaAccount,
    CreateAccount
};

export { accounts };

// import CreateAccount from "./create_account";
// import * as bip39 from 'bip39';

// let mnemonic = bip39.generateMnemonic()

// const accounts = { 
//     CreateAccount
// };

// export const acc = new CreateAccount(mnemonic, 'testnet');

// export { accounts };