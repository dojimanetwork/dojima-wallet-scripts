import { POSClient,use } from "../../../src/core/matic/client"
import { Web3ClientPlugin } from '../../../src/core/matic/web3-provider'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);
const privateKey = '0xae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0'
const mainRPC = 'https://api-test.d11k.dojima.network/'
const fromAddress = '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4'
const childRPC = 'https://api-test.d11k.dojima.network/'
const getPosClient = async () => {
    const posClient = new POSClient();
    return await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
            provider: new HDWalletProvider({
                mnemonic: {
                    phrase: 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'
                },
                providerOrUrl: childRPC,
                privateKeys: [privateKey],
            }),
            defaultConfig: {
                from : fromAddress
            }
        },
        child: {
            provider: new HDWalletProvider({
                mnemonic: {
                    phrase: 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'
                },
                providerOrUrl: mainRPC,
                privateKeys: [privateKey],
            }),
            defaultConfig: {
                from : fromAddress
            }
        }
    });
}

export { getPosClient }
