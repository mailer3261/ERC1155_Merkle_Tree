// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract WhitelistedERC1155 is ERC1155 {
    bytes32 public merkleRoot =
        0x43f7ff8ee7c4c51e1adf6dd9f5b6a65c46f98d405941bc20a2efddaf1f1fa290;
    address public admin;

    constructor() ERC1155("www.google.com") {
        admin = msg.sender;
    }

    function mint(
        uint256 id,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) public payable {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

        require(
            MerkleProof.verify(merkleProof, merkleRoot, leaf),
            "Invalid Merkle Proof."
        );
        _mint(msg.sender, id, amount, "");
    }

    function mintTo(
        address to,
        uint256 id,
        uint256 amount
    ) public onlyAdmin {
        _mint(to, id, amount, "");
    }

    function setURI(string memory newuri) public onlyAdmin {
        _setURI(newuri);
    }

    function setAdmin(address newAdmin) public onlyAdmin {
        admin = newAdmin;
    }

    modifier onlyAdmin() {
        require(admin == msg.sender, "Sender must be an admin.");
        _;
    }

}
