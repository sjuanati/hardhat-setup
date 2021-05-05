const { waffle } = require("hardhat");
import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

const provider = waffle.provider;

export const getTxCost = async (tx: any) => {
	const txGasPrice = tx.gasPrice;
	const txReceipt = await provider.getTransactionReceipt(tx.hash);
	const txGasConsumed = txReceipt.gasUsed;
	return txGasPrice.mul(txGasConsumed);
};

// export const ether = (amount: number | string): BigNumber => {
//   const weiString = ethers.utils.parseEther(amount.toString());
//   return BigNumber.from(weiString);
// };

// export const gWei = (amount: number): BigNumber => {
//   const weiString = BigNumber.from("1000000000").mul(amount);
//   return BigNumber.from(weiString);
// };

// export const usdc = (amount: number): BigNumber => {
//   const weiString = BigNumber.from("1000000").mul(amount);
//   return BigNumber.from(weiString);
// };