// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


async function main() {
  

  const DiscoverPattayaToken = await hre.ethers.getContractFactory("DiscoverPattayaToken");
  const discoverpattayatoken = await DiscoverPattayaToken.deploy();
  await discoverpattayatoken.deployed();

  const DiscoverPattaya = await hre.ethers.getContractFactory("DiscoverPattaya");
  const discoverpattaya = await DiscoverPattaya.deploy(discoverpattayatoken.address);
  await discoverpattaya.deployed();

  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(discoverpattayatoken.address);
  await faucet.deployed();


  console.log('Token at address: ' + discoverpattayatoken.address)
  console.log('Smart Contract at address: ' + discoverpattaya.address)
  console.log('Faucet at address: ' + faucet.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
