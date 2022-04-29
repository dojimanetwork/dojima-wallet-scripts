import {
  generatePhrase,
  validatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
  Keystore,
} from "@xchainjs/xchain-crypto";

export default class KeyStoreSecurity {
  mnemonic: string;
  constructor(mnemonic: string) {
    this.mnemonic = mnemonic;
  }

  async getEncryptedData(key: string) {
    try {
      if (validatePhrase(this.mnemonic)) {
        const keyStore = await encryptToKeyStore(this.mnemonic, key);
        return keyStore;
      } else {
        throw new Error("Invalid mnemonic");
      }
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        throw new Error(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  async getDecryptedData(keyStore: Keystore, key: string) {
    try {
      const phrase = await decryptFromKeystore(keyStore, key);
      return phrase;
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        throw new Error(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }
}
