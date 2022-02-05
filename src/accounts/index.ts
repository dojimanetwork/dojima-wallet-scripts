import getEth from './eth_account'
import getBitcoin from './bitcoin_account';
import getSolana from './solana_account';
import getPolkadot from './polkadot_account';

const accounts = { 
    getEth,
    getBitcoin,
    getSolana,
    getPolkadot
};

export { accounts };