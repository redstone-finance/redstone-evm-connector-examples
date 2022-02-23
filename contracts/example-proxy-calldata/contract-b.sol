// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAwareOwnable.sol";

contract ContractB is PriceAware {

  uint256 private lastValue = 0;

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    // For redstone-avalanche-prod price feed (it has 2 authorised signers)
    return _receviedSigner == 0x926E370fD53c23f8B71ad2B3217b227E41A92b12; // redstone-stocks
  }
  
  function writeValue() public {
    uint256 tslaPrice = getPriceFromMsg(bytes32("TSLA"));
    lastValue = tslaPrice;
  }

  function getValue() public view returns(uint256) {
    uint result = getPriceFromMsg(bytes32("TSLA"));
    return result;
  }
}
