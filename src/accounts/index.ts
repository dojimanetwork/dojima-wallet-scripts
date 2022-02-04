import getEth from './eth_account'
import getBitcoin from './bitcoin_account';
import getSolana from './solana_account';

const accounts = { 
    getEth,
    getBitcoin,
    getSolana
};

export { accounts };