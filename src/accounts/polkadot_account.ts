import {Keyring} from '@polkadot/api';
import {mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';

export default function getPolkadot() {
    const keyring = new Keyring() // default type "ed25519"
    // For specific type of keyring
    // const keyring = new Keyring({ type: "sr25519" });

    // Create mnemonic string
    const mnemonic = mnemonicGenerate();
    console.log(`Generated mnemonic: ${mnemonic}`);

    const isValidMnemonic = mnemonicValidate(mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic')
    }

    // Add an account derived from the mnemonic
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;
    const jsonWallet = JSON.stringify(keyring.toJson(address), null, 2)

    return jsonWallet
}