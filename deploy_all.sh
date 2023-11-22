#!/bin/bash

# Step 1: Clone Scaffold-eth and install dependencies
./utils/clone_scaffold.sh
node utils/configure_project.js

# Step 2: Deploy Smart Contracts
echo "Deploying Smart Contracts..."
cd scaffold-eth-2/packages/hardhat
# chmod +x ./node_modules/husky/lib/bin.js && husky install
yes | yarn
echo "finished installing..."
npx hardhat compile

# Deploy and capture the output
DEPLOYMENT_OUTPUT=$(yarn deploy --network polygonMumbai)
echo $DEPLOYMENT_OUTPUT
echo 'output...'

# Check if deployment was successful
if [[ $DEPLOYMENT_OUTPUT == *"deployed at"* ||  $DEPLOYMENT_OUTPUT == *"reusing"* ]]; then
  echo "Smart Contracts deployed successfully."

  # Load and export the environment variables
  cd ../../..
  ls
  eval $(node utils/export_env.js)
  node utils/replace-config.js
  node utils/inject_vercel_json.js

  # Step 3: Deploy Frontend
  echo "Deploying Frontend..."
  cd scaffold-eth-2/packages/nextjs
#   yes | yarn install
#   yarn build

  # Deploy to Vercel
  echo "Deploying to Vercel..."
  vercel --confirm --token "$VERCEL_TOKEN" 

  echo "Frontend deployed successfully."
else
  echo "Smart Contract deployment failed. Frontend deployment aborted."
  exit 1
fi
