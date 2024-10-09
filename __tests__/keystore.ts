import { AES, enc } from "crypto-js";

export default class KeyStoreSecurity {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}

  async getEncryptedData(data: string) {
    const key = "delete";
    try {
      const keyStore = AES.encrypt(data, key).toString();
      return keyStore;
    } catch (error) {
      throw new Error("Unable to Encrypt");
    }
  }

  async getDecryptedData(data: string) {
    const key = "delete";
    try {
      const decryptedData = AES.decrypt(data, key).toString(enc.Utf8);
      if (decryptedData.length > 0) return decryptedData;
      else throw new Error("Unable to Decrypt");
    } catch (error) {
      throw new Error("Unable to Decrypt");
    }
  }
}
