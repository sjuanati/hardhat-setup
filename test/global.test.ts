import { expect } from "chai";
const { ethers } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "@ethersproject/bignumber";
import { getTxCost } from "./../utils";
const { waffle } = require("hardhat");

describe("Global", function () {

    let Global: any;
    let global: any;
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let addrs: SignerWithAddress[];
    const provider = waffle.provider;

    beforeEach(async function () {
        Global = await ethers.getContractFactory("Global");
        [owner, user1, user2, ...addrs] = await ethers.getSigners();
        global = await Global.deploy("Hello");
    });

    it("should set the right owner", async function () {
        expect(await global.owner()).to.equal(owner.address);
    });

    // String
    it("should set the message", async function () {
        await global.setMessage("Sergi");
        expect(await global.getMessage()).to.equal("Sergi");
        await expect(
            global.connect(user1).setMessage("Marta")
        ).to.be.revertedWith("only admin");
    });

    // Bytes
    it("should set the title", async function () {
        await global.setTitle(ethers.utils.formatBytes32String("Hello 2"));
        const b32Title: String = await global.getTitle();
        expect(ethers.utils.parseBytes32String(b32Title)).to.be.equal("Hello 2");
    });

    // Balances, Value transfer (eth)
    it("should transfer eth", async function () {
        const beforeContractBalance: BigNumber = await global.getBalance();
        const beforeUserBalance: BigNumber = await user2.getBalance();
        
        expect(beforeContractBalance).to.be.equal(0);

        const tx = await global.connect(user2).deposit({value: 10});
        const txCost = await getTxCost(tx);

        const afterBalance: BigNumber = await global.getBalance();
        const afterUserBalance: BigNumber = (await user2.getBalance()).add(txCost);

        expect(afterUserBalance).to.be.equal(beforeUserBalance.sub(10));
        expect(afterBalance).to.be.equal(10);
    });


});
