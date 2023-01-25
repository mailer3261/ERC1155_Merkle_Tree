const { expect } = require("chai");

// const {ethers} = require("hardhat")
describe("WhitelistedERC1155", function () {
  let whitelistedERC1155;
  let admin;
  let listedAccount;
  let unlistedAccount;

  before(async function () {
    const accounts = await ethers.getSigners();
    admin = accounts[0];
    listedAccount = accounts[1];
    unlistedAccount = accounts[2];
  });

  it("Should deploy contract successfully", async function () {
    const WhitelistedERC1155 = await ethers.getContractFactory(
      "WhitelistedERC1155"
    );
    whitelistedERC1155 = await WhitelistedERC1155.deploy();
    await whitelistedERC1155.deployed();
  });

  it("Should set deploying address as Admin", async function () {
    expect(await whitelistedERC1155.admin()).to.equal(admin.address);
  });

  describe("mint()", function () {
    it("should mint tokens with a valid Merkle proof for listed Account", async function () {
      const merkleProofAdmin = [
        "0x00314e565e0574cb412563df634608d76f5c59d9f817e85966100ec1d48005c0",
        "0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65",
        "0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54",
      ];
      await whitelistedERC1155.mint(1, 2, merkleProofAdmin);

      expect(await whitelistedERC1155.balanceOf(admin.address, 1)).to.equal(2);
    });

    it("should revert, for Invalid merkle proof.", async function () {
      const merkleProofInvalid = [
        "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
        "0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65",
        "0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb55",
      ];
      // expect(
      //   await whitelistedERC1155.mint(1, 2, merkleProofInvalid)
      // ).to.revertedWith("Invalid Merkle Proof.");
      await expect(
        whitelistedERC1155.mint(1, 1, merkleProofInvalid)
      ).to.be.revertedWith("Invalid Merkle Proof.");
    });

    it("should revert, for valid merkle proof but of different account ", async function () {
      const merkleProoflisted = [
        "0xe9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9",
        "0x9d997719c0a5b5f6db9b8ac69a988be57cf324cb9fffd51dc2c37544bb520d65",
        "0x04a10bfd00977f54cc3450c9b25c9b3a502a089eba0097ba35fc33c4ea5fcb54",
      ];
      await expect(
        whitelistedERC1155.mint(1, 1, merkleProoflisted)
      ).to.be.revertedWith("Invalid Merkle Proof.");
    });
  });
  describe("mintTo()", function () {
    it("should mint tokens to a specified address when called by admin.", async function () {
      await whitelistedERC1155.mintTo(unlistedAccount.address, 1, 1);
      expect(
        await whitelistedERC1155.balanceOf(unlistedAccount.address, 1)
      ).to.equal(1);
    });

    it("should revert if called by someone else other than admin.", async function () {
      await expect(
        whitelistedERC1155
          .connect(listedAccount)
          .mintTo(unlistedAccount.address, 1, 1)
      ).to.be.revertedWith("Sender must be an admin.");
    });
  });
  describe("setURI()", () => {
    it("should set the URI of the token if called by admin", async () => {
      // Set the URI of the token
      await whitelistedERC1155.setURI("www.yahoo.com");

      // Check that the URI has been set correctly
      expect(
        await whitelistedERC1155.uri(1)
      ).to.equal("www.yahoo.com");
    });

    it("should revert if called by someone else other than admin", async () => {
      // Attempt to set the URI of the token as a non-admin
      await expect(
        whitelistedERC1155.connect(listedAccount).setURI("www.yahoo.com")
      ).to.be.revertedWith("Sender must be an admin.");
    });
  });
});
