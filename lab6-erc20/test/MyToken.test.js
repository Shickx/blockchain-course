const { expect } = require("chai");
const hre = require("hardhat");

describe("MyToken", function () {

  it("Should deploy with correct initial supply", async function () {
    const [deployer] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");

    const token = await MyToken.deploy(
      hre.ethers.parseEther("1000000")
    );

    const balance = await token.balanceOf(deployer.address);

    expect(balance.toString()).to.equal(
      hre.ethers.parseEther("1000000").toString()
    );
  });

  it("Should transfer tokens", async function () {
    const [deployer, user] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");

    const token = await MyToken.deploy(
      hre.ethers.parseEther("1000000")
    );

    await token.transfer(user.address, 1000);

    const balance = await token.balanceOf(user.address);

    expect(balance.toString()).to.equal("1000");
  });

  it("Should mint tokens", async function () {
    const [deployer, user] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");

    const token = await MyToken.deploy(
      hre.ethers.parseEther("1000000")
    );

    await token.mint(user.address, 1000);

    const balance = await token.balanceOf(user.address);

    expect(balance.toString()).to.equal("1000");
  });

});