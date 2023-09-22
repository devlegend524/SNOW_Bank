import { BigNumber, ethers } from "ethers";
import { erc20ABI } from "wagmi";

export function toReadableAmount(rawAmount, decimals) {
  if (!rawAmount) return 0;
  return Number(
    ethers.utils.formatUnits(BigNumber.from(rawAmount), decimals).toString()
  ).toFixed(5);
}

export async function getBalance(address, token, provider) {
  if (!token || !address || !provider) return;
  try {
    if (token.symbol === "WBNB") {
      const balance = await provider?.getBalance(address);
      return toReadableAmount(balance, 18);
    } else {
      const contract = new ethers.Contract(token.address, erc20ABI, provider);
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      return toReadableAmount(balance, Number(decimals.toString()));
    }
  } catch (e) {
    console.log(e);
  }
}
