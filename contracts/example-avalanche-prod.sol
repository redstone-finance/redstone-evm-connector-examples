// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleContractAvalancheProd is PriceAware {

  uint256 private lastPrice = 0;

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    // For redstone-avalanche-prod price feed (it has 2 authorised signers)
    return _receviedSigner == 0x981bdA8276ae93F567922497153de7A5683708d3
      || _receviedSigner == 0x3BEFDd935b50F172e696A5187DBaCfEf0D208e48;
  }
  
  function setPrice() public {
    uint256 ethPrice = getPriceFromMsg(bytes32("AVAX"));
    lastPrice = ethPrice;
  }

  function getLastPrice() public view returns(uint256) {
    return lastPrice;
  }
}
