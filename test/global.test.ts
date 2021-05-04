import { expect } from "chai";
const { ethers } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "@ethersproject/bignumber";


describe("Global", function () {

    let Global: any;
    let global: any;
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let addrs: SignerWithAddress[];

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
        const b32Title = await global.getTitle();
        expect(ethers.utils.parseBytes32String(b32Title)).to.be.equal("Hello 2");
    });

    // Value transfer (eth)
    it("should transfer eth", async function () {
        const beforeBalance: BigNumber = await global.getBalance();
        expect(beforeBalance).to.be.equal(0);
        await global.connect(user1).deposit({value: 10});
        const afterBalance: BigNumber = await global.getBalance();
        expect(afterBalance).to.be.equal(10);
    });


});
