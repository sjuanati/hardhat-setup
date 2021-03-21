// Non-TypeScript
// export default {
//     solidity: "0.7.6",
// };

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