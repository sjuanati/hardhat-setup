// it depends on hardhat-ethers, so adding both isn't necessary
require("@nomiclabs/hardhat-waffle");
// env variables
require('dotenv').config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const MNEMONIC = process.env.MNEMONIC;

module.exports = {
    solidity: "0.7.6",
    networks: {
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`0x${MNEMONIC}`]
        }
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