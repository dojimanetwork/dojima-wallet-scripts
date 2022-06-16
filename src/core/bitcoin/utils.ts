import { NetworkType } from "../../types/interfaces/network";
import * as Bitcoin from "bitcoinjs-lib";

export function btcNetwork(network: NetworkType): Bitcoin.networks.Network {
  switch (network) {
    case "mainnet":
    case "devnet":
      return Bitcoin.networks.bitcoin;
    case "testnet":
      return Bitcoin.networks.testnet;
  }
}

export function toSochainNetwork(network: NetworkType): string {
  switch (network) {
    case "mainnet":
    case "devnet":
      return "BTC";
    case "testnet":
      return "BTCTEST";
  }
}

export function validateAddress(
  address: string,
  network: NetworkType
): boolean {
  try {
    Bitcoin.address.toOutputScript(address, btcNetwork(network));
    return true;
  } catch (error) {
    return false;
  }
}

export function compileMemo(memo: string): Buffer {
  const data = Buffer.from(memo, "utf8"); // converts MEMO to buffer
  return Bitcoin.script.compile([Bitcoin.opcodes.OP_RETURN, data]); // Compile OP_RETURN script
}

