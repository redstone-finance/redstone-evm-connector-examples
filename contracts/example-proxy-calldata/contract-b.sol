// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ContractB is PriceAware {

  uint256 private lastValue = 0;

  /**
   * Override trustedSigner getter, thanks to this we don't need to authorise signer
   **/
  function getTrustedSigner() public view virtual override returns (address) {
    return 0x926E370fD53c23f8B71ad2B3217b227E41A92b12; //redstone-stocks;
  }
  
  function writeValue() public {
    uint256 tslaPrice = getPriceFromMsg(bytes32("TSLA"));
    lastValue = tslaPrice;
  }

  function getValue() public view returns(uint256) {
    return getPriceFromMsg(bytes32("TSLA"));
  }
}
