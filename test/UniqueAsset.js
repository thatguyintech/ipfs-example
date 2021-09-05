const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UniqueAsset", function () {
  it("Should award item to recipient", async function () {
    const UniqueAsset = await ethers.getContractFactory("UniqueAsset");

    // grab test addresses
    const [owner, recipient] = await ethers.getSigners();

    // deploy contract and wait for the tx to complete
    const uniqueAsset = await UniqueAsset.deploy();
    await uniqueAsset.deployed();

    // mint first NFT to owner
    const mintTx = await uniqueAsset.awardItem(owner.address, "1234", "1234");
    await mintTx.wait()
    expect(await uniqueAsset.getCurrentTokenId()).to.equal(1);

    // mint second NFT to recipient
    const mintTx2 = await uniqueAsset.awardItem(recipient.address, "2345", "2345");
    await mintTx2.wait();
    expect(await uniqueAsset.getCurrentTokenId()).to.equal(2);

    // check owner of tokenID 1
    expect(await uniqueAsset.ownerOf(1)).to.equal(owner.address);

    // check owner of tokenID 2
    expect(await uniqueAsset.ownerOf(2)).to.equal(recipient.address);

    // minting third NFT with same hash as second NFT to owner should fail...
    await expect(uniqueAsset.awardItem(owner.address, "2345", "2345")).to.be.revertedWith("IPFS hash has already been used. Please use a new IPFS hash.");
  });
});