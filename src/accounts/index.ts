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

let mnemonic = bip39.generateMnemonic()

const accounts = { 
    CreateAccount
};

export const acc = new CreateAccount(mnemonic, 'testnet');

export { accounts };