const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to load default environment variables from .env.default
const loadDefaultEnv = () => {
  const defaultEnvPath = path.join(__dirname, "../.env");
  const defaultEnv = {};

  if (fs.existsSync(defaultEnvPath)) {
    const content = fs.readFileSync(defaultEnvPath, "utf8");
    content.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        defaultEnv[key.trim()] = value.trim();
      }
    });
  }

  return defaultEnv;
};

// Default environment variables
const defaultEnv = loadDefaultEnv();

// Function to prompt for input with default value displayed
const promptForInput = (key, defaultValue) => {
  return new Promise((resolve) => {
    rl.question(
      `Enter value for ${key} (default: ${defaultValue}): `,
      (input) => {
        resolve(input || defaultValue);
      }
    );
  });
};

// // Function to ask if user wants to use default environment
// const promptForDefaultEnvironment = () => {
//   return new Promise((resolve) => {
//     rl.question("Use default environment? (yes/no): ", (input) => {
//       resolve(input.trim().toLowerCase() === "yes");
//     });
//   });
// };

// Function to update .env file with custom configurations
const updateEnvFile = async (envPath, configurations, useDefaults) => {
  let envContent = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, "utf8")
    : "";

  for (const [key] of Object.entries(configurations)) {
    let envValue = useDefaults
      ? defaultEnv[key]
      : await promptForInput(key, defaultEnv[key]);

    const regex = new RegExp(`^${key}=.*`, "gm");
    const newSetting = `${key}=${envValue}`;

    if (envContent.match(regex)) {
      envContent = envContent.replace(regex, newSetting);
    } else {
      envContent += `\n${newSetting}`;
    }
  }

  fs.writeFileSync(envPath, envContent, "utf8");
};

// Start of main execution
async function main() {
  // const useDefaults = await promptForDefaultEnvironment();
  const useDefaults = false;

  // Define paths to the .env files
  const reactAppEnvPath = path.join(
    __dirname,
    "..",
    "scaffold-eth-2",
    "packages",
    "nextjs",
    ".env"
  );
  const hardhatEnvPath = path.join(
    __dirname,
    "..",
    "scaffold-eth-2",
    "packages",
    "hardhat",
    ".env"
  );
  const userEnvPath = path.join(__dirname, ".env");

  // Prompt for configurations and update .env files
  await updateEnvFile(
    reactAppEnvPath,
    {
      NEXT_PUBLIC_ALCHEMY_API_KEY: "",
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: "",
      VERCEL_PROJECT_NAME: "",
      VERCEL_TOKEN: "",
    },
    useDefaults
  );
  await updateEnvFile(
    hardhatEnvPath,
    {
      ALCHEMY_API_KEY: "",
      DEPLOYER_PRIVATE_KEY: "",
      ETHERSCAN_API_KEY: "",
    },
    useDefaults
  );

  console.log("Configuration updated successfully.");
  rl.close();
}

main();
