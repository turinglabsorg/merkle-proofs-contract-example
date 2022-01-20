// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Contract is Ownable {
    using MerkleProof for bytes32[];
    bytes32 public merkleRoot;

    function setMerkleRoot(bytes32 root) external onlyOwner {
        merkleRoot = root;
    }

    function verifyProof(address _address, bytes32[] calldata _merkleProof)
        public
        view
        returns (bool)
    {
        bytes32 leaf = keccak256(abi.encodePacked(_address));
        return MerkleProof.verify(_merkleProof, merkleRoot, leaf);
    }
}
