import Web3ClientPlugin from "./web3-provider";
import {POSClient, setProofApi, use} from "./client";
import config from './config.json'
import HDWalletProvider from '@truffle/hdwallet-provider'
import bn from 'bn.js'

const SCALING_FACTOR = new bn(10).pow(new bn(18))

use(Web3ClientPlugin);

if (config.proofApi) {
    setProofApi(config.proofApi);
}

const privateKey = config.user1.privateKey
const userAddress = config.user1.address
const child = config.child
const plasma = config.plasma
const pos = config.pos
const from = config.user1.address
const to = config.user2.address

const getPOSClient = (network = 'testnet', version = 'mumbai') => {
    const posClient = new POSClient()
    return posClient.init({
        log: true,
        network: network,
        version: version,
        child: {
            // provider: new HDWalletProvider(privateKey, config.child.rpc),
            provider: new HDWalletProvider({
                mnemonic: {
                    phrase: 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'
                },
                providerOrUrl: config.child.rpc,
                privateKeys: [privateKey],
                // pollingInterval: 8000
            }),
            defaultConfig: {
                from: userAddress
            }
        },
        parent: {
            // provider: new HDWalletProvider(privateKey, config.parent.rpc),
            provider: new HDWalletProvider({
                mnemonic: {
                    phrase: 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'
                },
                providerOrUrl: config.parent.rpc,
                privateKeys: [privateKey],
                // pollingInterval: 8000
            }),
            defaultConfig: {
                from: userAddress
            }
        }
    });
}

export {
    SCALING_FACTOR,
    getPOSClient,
    child,
    plasma,
    pos,
    from,
    privateKey,
    to
}