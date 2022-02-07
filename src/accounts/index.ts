import getEth from './eth_account'
import getBitcoin from './bitcoin_account';
import getSolana from './solana_account';
import getPolkadot from './polkadot_account';
import getArweave from './arweave_account';

const accounts = { 
    getEth,
    getBitcoin,
    getSolana,
    getPolkadot,
    getArweave
};

export { accounts };

// import createAccount from "./create_account";

// const accounts = { 
//     createAccount
// };

// export { accounts };