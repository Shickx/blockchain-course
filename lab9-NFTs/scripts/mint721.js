const { ethers } = require("hardhat");

async function main() {
  const [owner, student] = await ethers.getSigners();

  const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

  const contract = await ethers.getContractAt(
    "SoulboundVisitCardERC721",
    contractAddress
  );

  const tx = await contract.mint(
    student.address,
    "John Doe",
    "S12345",
    "Blockchain Course",
    "https://ipfs.io/ipfs/example"
  );

  await tx.wait();

  console.log("Mint success:", student.address);
}

main().catch(console.error);