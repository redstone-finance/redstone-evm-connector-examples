// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-flash-storage/lib/contracts/message-based/PriceAware.sol";

contract ExampleRandom is PriceAware {

  uint256[] generatedNFTIndexes;

  function getRandomness() private view returns(uint256) {
    // TODO: connect redstone oracle here
    // randomValue = getPriceFromMsg(bytes32("RANDOM"));
    uint256 randomValue = 1231232132132131243546574;
    return uint256(
      keccak256(
        abi.encodePacked(
          randomValue,
          block.timestamp,
          blockhash(block.number - 1),
          blockhash(block.number)
        )
      )
    );
  }

  // Generates a random number from 1 to maxValue
  function generateRandomNumber(uint256 maxValue) public view returns(uint256) {
    uint256 randomness = getRandomness();
    return (randomness % maxValue) + 1;
  }

  // Firstly it generates a single random number (e.g. number of NFTs in a box)
  // Then it generates the specified number of random numbers
  function generateManyRandomNumbers(uint256 maxRandomNumbersCount, uint256 maxValue) public {
    // randomValue = getPriceFromMsg(bytes32("RANDOM"));
    uint256 randomness = getRandomness();
    uint256 randomNumbersCount = generateRandomNumber(maxRandomNumbersCount);
    generatedNFTIndexes = new uint256[](randomNumbersCount);
    for (uint256 i = 0; i < randomNumbersCount; i++) {
      generatedNFTIndexes[i] = uint256(keccak256(abi.encode(randomness, i))) % maxValue + 1;
    }
  }

  function getGeneratedNFTIndexes() public view returns(uint256[] memory) {
    return generatedNFTIndexes;
  }
}
