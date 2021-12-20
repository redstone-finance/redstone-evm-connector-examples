// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleStringsContract is PriceAware {

  string constant AUTHORISED_PROVIDERS = "0x000000000000000000000000000000000000,0xb794f5ea0ba39494ce839613fffba74279579262,0xb794f5ea0ba39494ce839613fffba74279579268,0xb794f5ea0ba39494ce839613fffba74279579269,0xb794f5ea0ba39494ce839613fffba74279579267,0xb794f5ea0ba39494ce839613fffba7427957926a,0xb794f5ea0ba39494ce839613fffba7427957926b,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f,0xb794f5ea0ba39494ce839613fffba7427957926f";

  function testFunGetter(address signer) public pure returns(bool) {
    // return AUTHORISED_PROVIDERS;
    // return toAsciiString(signer);
    return strIncludes(toAsciiString(signer), AUTHORISED_PROVIDERS);
  }

  // Copied from https://ethereum.stackexchange.com/questions/69307/find-word-in-string-solidity
  // And modified a bit
  function strIncludes(string memory what, string memory where) private pure returns(bool) {
    bytes memory whatBytes = bytes(what);
    bytes memory whereBytes = bytes(where);

    bool found = false;
    for (uint i = 0; i < whereBytes.length - whatBytes.length; i++) {
        bool flag = true;
        for (uint j = 0; j < whatBytes.length; j++)
            if (whereBytes [i + j] != whatBytes [j]) {
                flag = false;
                break;
            }
        if (flag) {
            found = true;
            break;
        }
    }
    return found;
  }

  // Copied from https://ethereum.stackexchange.com/questions/8346/convert-address-to-string
  function toAsciiString(address x) internal pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
      bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
      bytes1 hi = bytes1(uint8(b) / 16);
      bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
      s[2*i] = char(hi);
      s[2*i+1] = char(lo);            
    }
    return string(s);
  }

  // Copied from https://ethereum.stackexchange.com/questions/8346/convert-address-to-string
  function char(bytes1 b) internal pure returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
  }
}
