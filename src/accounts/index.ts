// import getEth from './eth_account'
// import getBitcoin from './bitcoin_account';
// import getSolana from './solana_account';
// import getPolkadot from './polkadot_account';
// import getArweave from './arweave_account';

// const accounts = { 
//     getEth,
//     getBitcoin,
//     getSolana,
//     getPolkadot,
//     getArweave
// };

// export { accounts };

import CreateAccount from "./create_account";
import * as bip39 from 'bip39';
import createAccount from './xchainjs_account';

let mnemonic = bip39.generateMnemonic()

const accounts = { 
    CreateAccount,
    createAccount
};

export const acc = new CreateAccount(mnemonic, 'testnet');

export { accounts };