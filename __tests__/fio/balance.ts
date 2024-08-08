import { Network } from "../../src/core/client";
import { FioClient } from "../../src/core/fio";

(async () => {
  const fioInst = new FioClient({
    phrase:
      "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn",
    network: Network.Stagenet,
    apiUrl: "",
  });
  const address = await fioInst.getAddress();
  console.log(address);
})();
