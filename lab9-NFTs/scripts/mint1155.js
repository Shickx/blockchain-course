const { ethers } = require("hardhat");

async function main() {
  const [owner, student] = await ethers.getSigners();

  const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

  const abi = [
    "function mint(address to, uint256 id, uint256 amount)",
    "function mintBatch(address to, uint256[] ids, uint256[] amounts)"
  ];

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    owner
  );

  //single mint
  await (await contract.mint(student.address, 0, 1)).wait();
  await (await contract.mint(student.address, 1, 1)).wait();

  //batch mint
  await (await contract.mintBatch(
    student.address,
    [2, 3, 4],
    [1, 1, 1]
  )).wait();

  console.log("ERC1155 minted successfully");
}

main().catch(console.error);