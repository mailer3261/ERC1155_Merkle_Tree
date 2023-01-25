const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();

  const WhitelistedERC1155 = await ethers.getContractFactory(
    "WhitelistedERC1155"
  );
  const whitelistedERC1155 = await WhitelistedERC1155.deploy();
  await whitelistedERC1155.deployed();
  console.log(`contract deployed to ${whitelistedERC1155.address}`);

}

main().catch((error) => {
  console.error(error);
});
