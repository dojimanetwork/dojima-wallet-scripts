import { Network } from "../../src/core/client";
import { HermesSdkClient } from "../../src/core/hermes";
import { AssetDOJNative, baseToAsset } from "../../src/core/utils";

(async () => {
  const phrase =
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
  /** Hermes client */
  const hermesClient = new HermesSdkClient({
    phrase,
    // network: Network.Testnet,
    // apiUrl: "https://api-test-h4s.dojima.network",
    // rpcUrl: "https://rpc-test-h4s.dojima.network",
    // apiUrl: 'http://localhost:1317',
    // rpcUrl: 'http://localhost:26657',
    network: Network.Stagenet,
    apiUrl: "https://api-h4s.dojima.network",
    rpcUrl: "https://rpc-h4s.dojima.network",
  });
  const hermesAddress = hermesClient.getAddress();
  console.log("H4S address :: ", hermesAddress);
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);
  /** sdojima1lmuzg9drgjc9dwdy5nhfgernpz4uqq9uesellg */
  const txs = await hermesClient.getTransactions({
    address: "sdojima109j0nd0hng8z4sakf8n0l489s36z43qe53u3re",
  })
  console.log("H4S Txs :: ", txs);
})();
