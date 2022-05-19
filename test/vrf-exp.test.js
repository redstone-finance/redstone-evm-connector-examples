const { expect } = require("chai");
const { ethers } = require("hardhat");
const axios = require("axios");

describe("VRF experiments", function () {
  const vrfNodeUrl = "https://redstone-vrf-oracle-node-1.redstone.finance/vrf-requests";
  // const vrfNodeUrl = "http://localhost:8080/vrf-requests";
  const dataHex = "0x1234567890abcdef";
  let contract, proofHex, hashHex, pubKeyHex, uPoint, vComponents, pubKeyArr, proofArr;

  before(async () => {
    // Deploy contract
    const VRFExpFactory = await ethers.getContractFactory("VRFExp");
    contract = await VRFExpFactory.deploy();

    // Request randomness from RedStone VRF node 
    const response = await axios.post(vrfNodeUrl, {
      message_hex: dataHex.replace("0x", ""),
    });
    console.log("Received response from RedStone VRF node:", response.data);

    proofHex = response.data.pi_hex;
    hashHex = response.data.hash_hex;
    pubKeyHex = response.data.pub_hex;
  });

  it("Should verify (standard way)", async () => {
    // Verifying in contract (standard way)
    const tx = await contract.functionUsingVRF(pubKeyHex, proofHex, dataHex);
    await tx.wait();
    const isProofValid = await contract.lastVerificationResult();
    expect(isProofValid).to.equal(true);
  });

  it("Should not verify invalid proof", async () => {
    const tx = await contract.functionUsingVRF(
      pubKeyHex,
      proofHex,
      changeHex(dataHex));
    await tx.wait();
    const isInvalidProofValid = await contract.lastVerificationResult();
    expect(isInvalidProofValid).to.equal(false);
  });

  it("Should compute fast verify params", async () => {
    pubKeyArr = await contract.decodePoint(pubKeyHex);
    proofArr = await contract.decodeProof(proofHex);

    [uPoint, vComponents] =
      await contract.computeFastVerifyParams(pubKeyArr, proofArr, dataHex);
  });

  it("Should verify valid proof (optimised)", async () => {
    const tx = await contract.optimisedFunctionUsingVRF(
      pubKeyArr,
      proofArr,
      dataHex,
      uPoint,
      vComponents);
    await tx.wait();
    const isProofValidFast = await contract.lastVerificationResult();
    expect(isProofValidFast).to.equal(true);
  });

  it("Should not verify invalid proof (optimised)", async () => {
    const tx = await contract.optimisedFunctionUsingVRF(
      pubKeyArr,
      proofArr,
      changeHex(dataHex),
      uPoint,
      vComponents);
    await tx.wait();
    const isInvalidProofValidFast = await contract.lastVerificationResult();
    expect(isInvalidProofValidFast).to.equal(false);
  });
});

function changeHex(hexStr) {
  if (hexStr[2] === "0") {
    return "0x" + hexStr.replace("0x", "").replace("0", "1");
  } else {
    return hexStr.replace(hexStr[2], "0");
  }
}
