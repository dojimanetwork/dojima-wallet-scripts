import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { Wallet } from "./types";
// import { sepolia } from "wagmi/chains";

export enum ChainId {
  ArbitrumSepolia = 421614,
}

export function getRpcUrl(chainId: number) {
  switch (chainId) {
    case sepolia.id:
      return sepolia.rpcUrls.default.http[0];

    case ChainId.ArbitrumSepolia:
      return "https://sepolia-rollup.arbitrum.io/rpc";

    default:
      throw new Error(`[getRpcUrl] Unexpected chainId: ${chainId}`);
  }
}

export const getRandomWallet = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  return { privateKey, address: account.address } as Wallet;
};

export const sepolia = {
  id: 11155111,
  network: "sepolia",
  name: "Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "SEP",
    decimals: 18,
  },
  rpcUrls: {
    alchemy: {
      http: ["https://eth-sepolia.g.alchemy.com/v2"],
      webSocket: ["wss://eth-sepolia.g.alchemy.com/v2"],
    },
    infura: {
      http: ["https://sepolia.infura.io/v3"],
      webSocket: ["wss://sepolia.infura.io/ws/v3"],
    },
    default: {
      http: ["https://rpc.sepolia.org"],
    },
    public: {
      http: ["https://rpc.sepolia.org"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6507670,
    },
  },
  testnet: true,
};
