import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { fromBase64, toUtf8 } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import Long from "long"; // Import Long from @cosmjs/math
import { Secp256k1, Secp256k1Signature } from "@cosmjs/crypto";

// Example mnemonic phrase (replace with a secure one for real usage)
const mnemonic =
  "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

// Message to sign
const message = "Hello, Cosmos!";

async function signMessage() {
  // Create a wallet from mnemonic
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

  // Get first account (usually the first derivation path)
  const [account] = await wallet.getAccounts();

  // Hash the message
  const messageBytes = toUtf8(message);
  const messageHash = sha256(messageBytes);

  // Set chainId and accountNumber (mocked here, replace with real values)
  const chainId = "cosmoshub-4";
  const accountNumber = Long.fromNumber(0); // Convert account number to Long

  // Sign the hashed message
  const signer = wallet;
  const signatureResponse = await signer.signDirect(account.address, {
    bodyBytes: messageHash,
    authInfoBytes: new Uint8Array(), // Not needed for this basic example
    chainId,
    accountNumber,
  });

  // Extract signature in base64 format
  const signatureBase64 = signatureResponse.signature.signature;

  console.log("Address:", account.address);
  console.log("Public Key (Base64):", account.pubkey);
  console.log("Signature (Base64):", signatureBase64);
  console.log("messageHash:", messageHash);

  return { pubKey: account.pubkey, messageHash, signatureBase64 };
}

signMessage()
  .then((res) => {
    // Use the result from signMessage() to verify the signature
    verifySignature(res.pubKey, res.signatureBase64, res.messageHash, message);
  })
  .catch(() => console.error("Error running"));

async function verifySignature(
  pubKey: Uint8Array,
  signatureBase64: string,
  messageHash: Uint8Array,
  originalMessage: string
) {
  // Convert the Uint8Array signature to Secp256k1Signature
  const signatureBytes = fromBase64(signatureBase64);
  const signature = Secp256k1Signature.fromFixedLength(signatureBytes);

  // Verify the signature using the message hash and public key (both Uint8Array)
  const isValid = await Secp256k1.verifySignature(
    signature,
    messageHash,
    pubKey
  );

  if (isValid) {
    console.log("Signature is valid!");
  } else {
    console.log("Invalid signature!");
  }

  // Additional check: Confirm that the message hash matches the original message
  const recalculatedMessageHash = sha256(
    new TextEncoder().encode(originalMessage)
  );

  if (messageHash.toString() === recalculatedMessageHash.toString()) {
    console.log("Message hash matches!");
  } else {
    console.log("Message hash does not match!");
  }
}
