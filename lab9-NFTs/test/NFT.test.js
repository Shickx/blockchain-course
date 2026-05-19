const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Contracts", function () {

  let owner, student, addr2;
  let soulbound;
  let game;

  beforeEach(async function () {

    [owner, student, addr2] = await ethers.getSigners();

    // Deploy ERC721
    const Soulbound = await ethers.getContractFactory(
      "SoulboundVisitCardERC721"
    );

    soulbound = await Soulbound.deploy();
    await soulbound.waitForDeployment();

    // Deploy ERC1155
    const Game = await ethers.getContractFactory(
      "GameCharacterCollectionERC1155"
    );

    game = await Game.deploy();
    await game.waitForDeployment();
  });

  // =========================
  // ERC721 TESTS
  // =========================

  it("Should mint one soulbound NFT to student", async function () {

    await soulbound.mint(
      student.address,
      "John Doe",
      "S12345",
      "Blockchain Course",
      "https://ipfs.io/ipfs/example"
    );

    expect(await soulbound.ownerOf(1)).to.equal(student.address);
  });

  it("Should block transfer of soulbound NFT", async function () {

    await soulbound.mint(
      student.address,
      "John Doe",
      "S12345",
      "Blockchain Course",
      "https://ipfs.io/ipfs/example"
    );

    await expect(
      soulbound.connect(student).transferFrom(
        student.address,
        addr2.address,
        0
      )
    ).to.be.reverted;
  });

  it("Should prevent double minting", async function () {

    await soulbound.mint(
      student.address,
      "John Doe",
      "S12345",
      "Blockchain Course",
      "https://ipfs.io/ipfs/example"
    );

    await expect(
      soulbound.mint(
        student.address,
        "John Doe",
        "S12345",
        "Blockchain Course",
        "https://ipfs.io/ipfs/example"
      )
    ).to.be.reverted;
  });

  // =========================
  // ERC1155 TESTS
  // =========================

  it("Should mint ERC1155 character", async function () {

    await game.mint(student.address, 0, 1);

    expect(await game.balanceOf(student.address, 0)).to.equal(1);
  });

  it("Should batch mint ERC1155 characters", async function () {

    await game.mintBatch(
      student.address,
      [1, 2, 3],
      [1, 1, 1]
    );

    expect(await game.balanceOf(student.address, 1)).to.equal(1);
    expect(await game.balanceOf(student.address, 2)).to.equal(1);
    expect(await game.balanceOf(student.address, 3)).to.equal(1);
  });

  it("Should transfer ERC1155 token", async function () {

    await game.mint(student.address, 5, 1);

    await game.connect(student).safeTransferFrom(
      student.address,
      addr2.address,
      5,
      1,
      "0x"
    );

    expect(await game.balanceOf(addr2.address, 5)).to.equal(1);
  });

});