require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

// const GOERLI_URL = process.env.GOERLI_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/f_zsEfNmeAr8KjkUQAAN-XKIkU5do4KP',
      accounts: ['584f4c0b96f14ce55666b935848bd40672366fecd93dc54af7532129e863963a'],
    },
  },
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/b89fda8bb5fc4657af658923408b883a',
      accounts: ['584f4c0b96f14ce55666b935848bd40672366fecd93dc54af7532129e863963a']
    }
  }
};