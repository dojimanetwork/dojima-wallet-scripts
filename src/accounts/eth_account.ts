import Web3 from 'web3'
import { Account } from 'web3-core'

export default function getEth(): Account {
    var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
    var ethAccount = web3.eth.accounts.create();
    return ethAccount;
}