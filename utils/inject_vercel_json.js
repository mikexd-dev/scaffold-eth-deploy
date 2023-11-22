const fs = require("fs");
const path = require("path");
require("dotenv").config();

const vercelConfigPath = path.join(
  __dirname,
  "..",
  "scaffold-eth-2",
  "packages",
  "nextjs",
  "vercel.json"
);

const envConfigPath = path.join(
  __dirname,
  "..",
  "scaffold-eth-2",
  "packages",
  "nextjs",
  ".env"
);

const loadDefaultEnv = () => {
  // const defaultEnvPath = path.join(__dirname, "../.env");
  let projectName = "";

  if (fs.existsSync(envConfigPath)) {
    const content = fs.readFileSync(envConfigPath, "utf8");
    content.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value && key === "VERCEL_PROJECT_NAME") {
        projectName = value.trim();
      }
    });
  }

  return projectName;
};
const projectName = loadDefaultEnv(); // Name of your environment variable

if (!projectName) {
  console.error("VERCEL_PROJECT_NAME is not defined");
  process.exit(1);
}

let vercelConfig = {};

if (fs.existsSync(vercelConfigPath)) {
  vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8"));
}

vercelConfig.name = projectName;
console.log(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
console.log(`vercel.json updated with project name: ${projectName}`);
