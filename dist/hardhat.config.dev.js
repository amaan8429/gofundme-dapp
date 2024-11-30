"use strict";

/* eslint-disable @typescript-eslint/no-require-imports */
require("@nomicfoundation/hardhat-toolbox");

var dotenv = require("dotenv");

dotenv.config();
var config = {
  solidity: "0.8.27",
  defaultNetwork: "amoy",
  networks: {
    amoy: {
      url: "https://polygon-amoy.infura.io/v3/".concat(NEXT_PUBLIC_RPC_KEY),
      accounts: [NEXT_PUBLIC_PRIVATE_KEY]
    },
    lineaSepolia: {
      url: "https://linea-sepolia.infura.io/v3/".concat(NEXT_PUBLIC_RPC_KEY),
      account: [NEXT_PUBLIC_PRIVATE_KEY]
    },
    educhain: {
      url: "https://rpc.open-campus-codex.gelato.digital",
      account: [NEXT_PUBLIC_PRIVATE_KEY]
    },
    mantle: {
      url: "https://rpc.sepolia.mantle.xyz",
      account: [NEXT_PUBLIC_PRIVATE_KEY]
    },
    arbritrumSepolia: {
      url: "https://arb-sepolia.g.alchemy.com/v2/".concat(NEXT_PUBLIC_RPC_KEY),
      account: [NEXT_PUBLIC_PRIVATE_KEY]
    }
  }
};
module.exports = config;