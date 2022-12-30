require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    sepolia:{
      url:process.env.SEPOLIA,
      accounts:[process.env.POKEMON]
    }
  }
};