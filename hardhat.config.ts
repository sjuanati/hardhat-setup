// it depends on hardhat-ethers, so adding both isn't necessary
require("@nomiclabs/hardhat-waffle");
// .env variables
require('dotenv').config();
// contract verification
require("@nomiclabs/hardhat-etherscan");


const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

module.exports = {
    solidity: "0.7.6",
    networks: {
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`0x${ETH_PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: `${ETHERSCAN_KEY}`
    }
};




// Non-TypeScript
// export default {
//     solidity: "0.7.6",
// };

/*
// TypeScript:
import { HardhatUserConfig } from "hardhat/types";
//import "@nomiclabs/hardhat-waffle";  //required to support 'import {ethers} from 'hardhat''
import "@nomiclabs/hardhat-truffle5";
const config: HardhatUserConfig = {
    solidity: {
        compilers: [{ version: "0.7.6", settings: {} }],
    },
};
export default config;
*/