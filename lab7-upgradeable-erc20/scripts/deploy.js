const hre = require("hardhat");

async function main() {
  const { ethers, upgrades } = hre;

  const MyToken = await ethers.getContractFactory("MyTokenV1");

  const token = await upgrades.deployProxy(
    MyToken,
    [ethers.parseEther("1000000")],
    { initializer: "initialize" }
  );

  await token.waitForDeployment();

  console.log("Proxy deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});