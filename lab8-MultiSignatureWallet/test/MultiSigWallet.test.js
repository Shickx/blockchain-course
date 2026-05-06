const { expect } = require("chai");

describe("MultiSigWallet", function () {
  let contract;
  let owner1, owner2, owner3, user;

  beforeEach(async function () {
    [owner1, owner2, owner3, user] = await ethers.getSigners();

    const MultiSig = await ethers.getContractFactory("MultiSigWallet");

    contract = await MultiSig.deploy(
      [owner1.address, owner2.address, owner3.address],
      2
    );

    await contract.waitForDeployment();
  });

  it("Should deploy with correct owners and required confirmations", async function () {
    expect(await contract.required()).to.equal(2n);
    expect(await contract.isOwner(owner1.address)).to.equal(true);
  });

  it("Should submit and confirm transaction", async function () {
    // отправляем ETH в контракт
    await owner1.sendTransaction({
      to: await contract.getAddress(),
      value: ethers.parseEther("1"),
    });

    // submit
    await contract.connect(owner1).submitTransaction(
      user.address,
      ethers.parseEther("0.1"),
      "0x"
    );

    // confirm двумя владельцами
    await contract.connect(owner1).confirmTransaction(0);
    await contract.connect(owner2).confirmTransaction(0);

    const tx = await contract.transactions(0);
    expect(tx.confirmations).to.equal(2n);
  });

  it("Should execute transaction after required confirmations", async function () {
    await owner1.sendTransaction({
      to: await contract.getAddress(),
      value: ethers.parseEther("1"),
    });

    await contract.connect(owner1).submitTransaction(
      user.address,
      ethers.parseEther("0.1"),
      "0x"
    );

    await contract.connect(owner1).confirmTransaction(0);
    await contract.connect(owner2).confirmTransaction(0);

    const balanceBefore = await ethers.provider.getBalance(user.address);

    await contract.connect(owner1).executeTransaction(0);

    const balanceAfter = await ethers.provider.getBalance(user.address);

    expect(balanceAfter).to.be.gt(balanceBefore);
  });

  it("Should not allow duplicate confirmations", async function () {
    await contract.connect(owner1).submitTransaction(
      user.address,
      0,
      "0x"
    );

    await contract.connect(owner1).confirmTransaction(0);

    await expect(
      contract.connect(owner1).confirmTransaction(0)
    ).to.be.reverted;
  });
});