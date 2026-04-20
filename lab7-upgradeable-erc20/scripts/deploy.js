const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");

  const myToken = await MyToken.deploy(
    ethers.parseUnits("1000000", 18)
  );

  await myToken.waitForDeployment();

  console.log("MyToken deployed to:", await myToken.getAddress());

  const tx = myToken.deploymentTransaction();
  console.log("TX:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});