const fs = require("fs");
const path = require("path");

const configFileContent = `
import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetwork: chains.Chain;
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
};

const scaffoldConfig = {
  targetNetwork: chains.polygonMumbai,
  pollingInterval: 30000,
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",
  onlyLocalBurnerWallet: true,
  walletAutoConnect: true,
} satisfies ScaffoldConfig;

export default scaffoldConfig;
`;

const configFilePath = path.join(
  __dirname,
  "..",
  "scaffold-eth-2",
  "packages",
  "nextjs",
  "scaffold.config.ts"
); // Update this path

fs.writeFileSync(configFilePath, configFileContent);
console.log("scaffold.config.ts has been replaced successfully.");
