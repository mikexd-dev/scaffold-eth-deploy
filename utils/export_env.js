require("dotenv").config();

// List the environment variables you need
const variables = ["VERCEL_TOKEN", "VERCEL_PROJECT_NAME"];

// Print each variable in a format that can be exported
variables.forEach((variable) => {
  if (process.env[variable]) {
    console.log(`export ${variable}='${process.env[variable]}'`);
  }
});
