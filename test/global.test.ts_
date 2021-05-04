
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');
const assert = require('assert');


// Load compiled artifacts
const TestHH = contract.fromArtifact('TestHH');

describe("TestHH", () => {

    // Use the different accounts, which are unlocked and funded with Ether
    const [admin, deployer, user] = accounts;
    let testHH: any;

    beforeEach(async () => {
        // Deploy a new Box contract for each test
        testHH = await TestHH.new({ from: admin });
    });

    it("Should return the new greeting once it's changed", async function () {

        console.log(await testHH.message());
        const value = new BN('42');
        console.log(value.toString());
    });
});


/*
const assert = require('assert');
import { ethers } from "hardhat";
import { Contract } from 'ethers';

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { accounts, contract } = require('@openzeppelin/test-environment');

describe("TestHH", () => {

    let testHH: Contract;

    beforeEach(async () => {
      const TestHH = await ethers.getContractFactory("TestHH");
      testHH = await TestHH.deploy('Sergiet');
      await testHH.deployed();
    });

    it("Should return the new greeting once it's changed", async function () {

      console.log(await testHH.message());
      const value = new BN('42');
      console.log(value.toString());
    });
  });
*/