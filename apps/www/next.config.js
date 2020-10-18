// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const pathSrc = path.resolve(__dirname, "src");

const nextConfig = {
  env: {
    API_URL: process.env.BUILD_FOR_VERCEL ? "/api" : process.env.API_URL,
  },
  webpack: config => {
    config.resolve.alias["@"] = pathSrc;

    return config;
  },
};

module.exports = nextConfig;
