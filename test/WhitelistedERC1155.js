const { expect } = require("chai");
// const {ethers} = require("hardhat")
describe("WhitelistedERC1155", function () {
  // async function deployWhitelistedERC1155() {

  //   // Contracts are deployed using the first signer/account by default
  //   const [owner, otherAccount] = await ethers.getSigners();

  //   const WhitelistedERC1155 = await ethers.getContractFactory("WhitelistedERC1155");
  //   const whitelistedERC1155 = await WhitelistedERC1155.deploy();

  //   return { whitelistedERC1155, owner, otherAccount };
  // }

  describe("Deployment", function () {
    it("Should deploy contract successfully", async function () {
      const [owner, otherAccount] = await ethers.getSigners();
      // console.log(owner,otherAccount)
      const WhitelistedERC1155 = await ethers.getContractFactory(
        "WhitelistedERC1155"
      );
      // console.log(WhitelistedERC1155)
      const whitelistedERC1155 = await WhitelistedERC1155.deploy();
      console.log(whitelistedERC1155)
      await whitelistedERC1155.deployed()
      
    });
  });
});
