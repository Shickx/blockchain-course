const hre = require("hardhat");

async function main() {
  const [deployer, student] = await hre.ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  //ERC721 Soulbound
  const SBT = await hre.ethers.getContractFactory("SoulboundVisitCardERC721");
  const sbt = await SBT.deploy();
  await sbt.waitForDeployment();

  console.log("Soulbound deployed:", await sbt.getAddress());

  //ERC1155
  const Game = await hre.ethers.getContractFactory("GameCharacterCollectionERC1155");
  const game = await Game.deploy();
  await game.waitForDeployment();

  console.log("Game deployed:", await game.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});