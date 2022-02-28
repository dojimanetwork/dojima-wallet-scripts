import Wallet from 'ethereumjs-wallet';
import Web3 from 'web3';

// export default async function EthereumChain() {
//     // // Ganache local enviroment
//     // const web3 = new Web3('http://localhost:7545');
//     // const accounts = await web3.eth.getAccounts();
//     // console.log('Account details', accounts);

//     // const balance = await web3.eth.getBalance(accounts[0]);
//     // console.log('Balance in gwei is : ', balance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
//     // console.log('Balance in Eth is : ', web3.utils.fromWei(balance));     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
    
//     // const transaction = await web3.eth.accounts.signTransaction({
//     //     from: accounts[0],
//     //     to: accounts[1],
//     //     value: web3.utils.toWei('0.05', 'ether'),         // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
//     //     gas: 21000              // Minimum / base gas fee is 21,000
//     // }, 'dbd9beb787980ec5b0f3406faf3b1faaaf004a6c5660a757ac8e86818fed0196' );
//     // console.log('Transaction : ', transaction);

//     // const transactionResult = await web3.eth.sendSignedTransaction(transaction.rawTransaction as string);
//     // console.log('Transaction details : ', transactionResult);

//     const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/f37faaf5ddeb4e589d6f26300ed673a6'));
//     const pubKey = '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4';
//     const prvtKey = 'ae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0';

//     const balance = await web3.eth.getBalance(pubKey);
//     console.log('Balance in gwei is : ', balance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
//     console.log('Balance in Eth is : ', web3.utils.fromWei(balance));     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
    
//     const transaction = await web3.eth.accounts.signTransaction({
//         from: pubKey,
//         to: '0x46Bd84009D313c34f94bC883C353f72D3453A5B9',
//         value: web3.utils.toWei('0.005', 'ether'),         // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
//         gas: 21000              // Minimum / base gas fee is 21,000
//     }, prvtKey );
//     console.log('Transaction : ', transaction);

//     const transactionResult = await web3.eth.sendSignedTransaction(transaction.rawTransaction as string);
//     console.log('Transaction details : ', transactionResult);
    
// }

export class EthereumChain {
    _wallet: Wallet;
    _web3: Web3;
    pubKey: string;
    pvtKey: string;
    constructor(web3: Web3, wallet: Wallet) {
        this._web3 = web3;
        this._wallet = wallet;
        this.pubKey = wallet.getAddressString();
        this.pvtKey = wallet.getPrivateKeyString();
        console.log('Key details : ', this.pvtKey);
        console.log('Address details : ', this.pubKey);
    }

    async getBalance() {
        const gweiBalance = await this._web3.eth.getBalance(this.pubKey);
        // console.log('Balance in gwei is : ', gweiBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

        const ethBalance = this._web3.utils.fromWei(gweiBalance);
        // console.log('Balance in Eth is : ', ethBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)
        
        return ethBalance;
    }

    async createTransactionAndSend(toAddress: string, amount: number) {
        const transaction = await this._web3.eth.accounts.signTransaction({
            from: this.pubKey,
            to: toAddress,
            value: this._web3.utils.toWei(amount.toString(), 'ether'),         // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
            gas: 21000              // Minimum / base gas fee is 21,000
        }, this.pvtKey);
        // console.log('Transaction : ', transaction);

        const transactionResult = await this._web3.eth.sendSignedTransaction(transaction.rawTransaction as string);
        // console.log('Transaction details : ', transactionResult);

        return {
            transaction,
            transactionResult
        };
    }
}