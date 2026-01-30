const hre = require("hardhat");

async function main() {
  // Use hre.ethers, no TS problem
  const SplitChain = await hre.ethers.getContractFactory("SplitChain");
  const splitChain = await SplitChain.deploy();

  await splitChain.deployed();

  console.log("SplitChain deployed to:", splitChain.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
