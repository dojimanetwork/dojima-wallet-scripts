import BitcoinClient from './client';
import { validateAddress } from './utils';
import { BtcRawTransactionResult } from './types/client';

export default BitcoinClient;
export {
    validateAddress,
    BtcRawTransactionResult
};