require("@nomicfoundation/hardhat-toolbox");

const GETBLOCKIO_API_KEY = process.env.GETBLOCKIO_API_KEY;
const BSC_SCAN_API_KEY = process.env.BSC_SCAN_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    milkomeda: {
      url: "https://rpc-mainnet-cardano-evm.c1.milkomeda.com",
      chainId: 2001,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY],
      httpHeaders: {
        "x-api-key": GETBLOCKIO_API_KEY,
      },
    },
    milkomedaTestnet: {
      url: "https://rpc-devnet-cardano-evm.c1.milkomeda.com",
      chainId: 20010,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY],
      httpHeaders: {
        "x-api-key": GETBLOCKIO_API_KEY,
      },
    },
  },
  etherscan: {
    apiKey: {
      bsc: BSC_SCAN_API_KEY,
      bscTestnet: BSC_SCAN_API_KEY,
    },
  },
};
