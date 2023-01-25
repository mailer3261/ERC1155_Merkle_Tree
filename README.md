# ERC1155_Merkle_Tree (ERC1155 contract, with tests for that contract, and a script that deploys that contract.)

whitelisting for Tokens can be implemented in various ways such as,

1. Array of whitelisted addresses
2. Mapping of Addresses and Boolean

add or remove functionality for multiple addresses can be done with the help of arrays and loops.

the problem with above two is when we want to add multiple people it consumes lots of gas.

so solution is to use Merkle tree

we can create a merkle root for a group of multiple addreses in the backend and provide proofs for verfication while minting.

we implement this by using a merkleRoot which can be stored on the blockchain and updated as whitelisted addressess change.

This repository is the implementation of the same along with a script that tests various functionality such as minting tokens, setting the URI of the token, and setting an admin.
It uses the Chai library to make assertions and the hardhat environment for testing and deploying the contract.

Testing script for this contract include the following steps:

1)Deploy the contract and Verify that the contract has the expected initial state (e.g. that the admin variable is set to the deploying address)

2)Test the mint() function by:
      - Providing a valid Merkle proof and confirming that the function call succeeds and the token is minted to the correct address
      - Providing an invalid Merkle proof and confirming that the function call reverts with the expected error message
      - Providing an valid Merkle proof but of a different account

3)Test the mintTo() function by:
      - Minting a token to a specified address using the mintTo() function and confirming that the token is minted and owned by the correct address
      - Attempting to mint a token to a specified address using the mintTo() function from a non-admin account and confirming that the function call reverts with the expected error message

4)Test the setURI() function by:
    - Changing the URI of a token and confirming that the change is reflected in the contract's state
    - Attempting to change the URI of a token from a non-admin account and confirming that the function call reverts with the expected error message

5)Test the setAdmin() function by:
    - Changing the admin of the contract and confirming that the change is reflected in the contract's state
    - Attempting to change the admin of the contract from a non-admin account and confirming that the function call reverts with the expected error message




Try running some of the following in the terminal:

```shell
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js
```
