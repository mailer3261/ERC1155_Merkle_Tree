// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.

const {ethers} = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();

  const WhitelistedERC1155 = await ethers.getContractFactory(
    "WhitelistedERC1155"
  );
  const whitelistedERC1155 = await WhitelistedERC1155.deploy();

  console.log(
    `contract deployed to ${whitelistedERC1155.address}`
  );

  console.log(await whitelistedERC1155.uri(2))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
