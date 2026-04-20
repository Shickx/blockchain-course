const hre = require("hardhat");

async function main() {
  const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const MyTokenV2 = await hre.ethers.getContractFactory("MyTokenV2");

  const upgraded = await hre.upgrades.upgradeProxy(
    proxyAddress,
    MyTokenV2
  );

  console.log("Contract upgraded at:", await upgraded.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});