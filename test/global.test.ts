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

    const STATUS = {
        Male: 0,
        Female: 1,
        Unknown: 2,
    };

    beforeEach(async function () {
        Global = await ethers.getContractFactory("Global");
        //Global = await ethers.getContractAt("Global");
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

        const tx = await global.connect(user2).deposit({ value: 10 });
        const txCost = await getTxCost(tx);
        //console.log('gas estimate 1:', txCost.toString());
        //const txCost2 = await global.connect(user2).estimateGas.deposit({ value: 10 });
        //console.log('gas estimate 2:', txCost2.toString());

        const afterContractBalance: BigNumber = await global.getBalance();
        const afterUserBalance: BigNumber = (await user2.getBalance()).add(txCost);

        expect(afterUserBalance).to.be.equal(beforeUserBalance.sub(10));
        expect(afterContractBalance).to.be.equal(10);
    });

    // Structs, arrays
    it("should add person", async function () {
        await global.connect(user1).addPerson("Sergi", 43, 231931597, STATUS.Male);
        await global.connect(user2).addPerson("Marta", 45, 175425997, STATUS.Female);
        const [sergi, marta] = await global.getPeople();

        // call mapping
        const sergi2 = await global.person(user1.address);

        // call mapping inside array
        const marta2 = await global.people(1);

        expect(sergi.name).to.be.equal(sergi2.name);
        expect(marta.name).to.be.equal(marta2.name);
    });

    // Return multiple values
    it("should return 2 values", async function () {
        const {val1, val2} = await global.getTwoValues("Mike", 50);
        expect(val1).to.be.equal("Mike");
        expect(val2).to.be.equal(50);
    });

    // Send eth through fallback / send transaction
    it("should send eth thru fallback", async function() {
        const VALUE = ethers.utils.parseUnits('5', 'ether').toHexString();
        const beforeContractBalance: BigNumber = await global.getBalance();
        const params = [{
            from: user2.address,
            to: global.address,
            value: VALUE,
        }];
        await provider.send('eth_sendTransaction', params);
        const afterContractBalance: BigNumber = await global.getBalance();

        expect(beforeContractBalance.add(VALUE)).to.be.equal(afterContractBalance);
    })

    // TODO: timestamp
});
