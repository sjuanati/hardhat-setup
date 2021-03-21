require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const INFURA_APP_KEY = process.env.INFURA_APP_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

require("ts-node").register({
  files: true,
});

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
    },
    ropsten: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, `https://ropsten.infura.io/v3/${INFURA_APP_KEY}`),
      network_id: 3,
      gas: 5500000,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, `https://rinkeby.infura.io/v3/${INFURA_APP_KEY}`),
      network_id: 4,
      gas: 5000000,
    },
    live: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, `https://mainnet.infura.io/v3/${INFURA_APP_KEY}`),
      network_id: 1,
      gas: 5000000,
      gasPrice: 5000000000, // ?
    },
  },
  // Tests
  mocha: {
    timeout: 100000
  },
  // Contract verification
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: ETHERSCAN_KEY
  },
  // Configure compilers

  compilers: {
    solc: {
      version: "0.7.6",
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
};
