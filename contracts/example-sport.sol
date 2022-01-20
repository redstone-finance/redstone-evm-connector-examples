// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleSportContract is PriceAware {

  uint256 private randa_markos__livia_renata_souza_0 = 0;
  uint256 private randa_markos__livia_renata_souza_1 = 0;
  uint8 mostProbableWinner = 3;
  
  function setOutcomes() public {
    randa_markos__livia_renata_souza_0 = getPriceFromMsg("nnWhu8FHPxVOsWlp0GhN2HUNvlCzR/");
    randa_markos__livia_renata_souza_1 = getPriceFromMsg("wyOvWDNDpdT4cqrWml3DSXq4UiCQxD");

    if (randa_markos__livia_renata_souza_0 > randa_markos__livia_renata_souza_1) {
      mostProbableWinner = 0;
    } else {
      mostProbableWinner = 1;
    }
  }

  function getOutcome(uint8 outcomeIndex) public view returns(uint256) {
    require(outcomeIndex == 0 || outcomeIndex == 1, "outcomeIndex must be 0 or 1");
    if (outcomeIndex == 0) {
      return randa_markos__livia_renata_souza_0;
    } else {
      return randa_markos__livia_renata_souza_1;
    }
  }

  function getMostProbableWinner() public view returns(uint8) {
    return mostProbableWinner;
  }
}
