import {
  validatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
  Keystore,
} from "@xchainjs/xchain-crypto";

export default class KeyStoreSecurity {
  constructor() {}

  async getEncryptedData(mnemonic: string, key: string) {
    try {
      if (validatePhrase(mnemonic)) {
        const keyStore = await encryptToKeyStore(mnemonic, key);
        return keyStore;
      } else {
        throw new Error("Invalid mnemonic");
      }
    } catch (error) {
      throw new Error("Unable to Encrypt");
    }
  }

  async getDecryptedData(keyStore: Keystore, key: string) {
    try {
      const phrase = await decryptFromKeystore(keyStore, key);
      return phrase;
    } catch (error) {
      throw new Error("Unable to Decrypt");
    }
  }
}
