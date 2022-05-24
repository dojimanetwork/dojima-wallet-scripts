import KeyStoreSecurity from "../src/security/keystore";

async function checkPassword() {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

  const inst = new KeyStoreSecurity();
  const keyStore = await inst.getEncryptedData(phrase, "AppID008.");
  console.log(keyStore);
  if(keyStore !== undefined) {
    const seed = await inst.getDecryptedData(keyStore, "AppID008.");
    console.log(seed);
  }
//   setTimeout(async () => {
//     const seed = await inst.getDecryptedData(keyStore as Keystore, "AppID008.");
//     console.log(seed);
//   }, 5000);
}

(async () => {
  await checkPassword();
})();
