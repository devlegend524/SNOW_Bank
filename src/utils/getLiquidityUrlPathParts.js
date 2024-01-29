// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { CHAIN_ID } from "config";
import { getWethAddress } from "./addressHelpers";

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }) => {
  const wBNBAddressString = getWethAddress();
  const quoteTokenAddressString = quoteTokenAddress ? quoteTokenAddress : null;
  const tokenAddressString = tokenAddress ? tokenAddress : null;
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString === wBNBAddressString
      ? "wBNB"
      : quoteTokenAddressString;
  const secondPart =
    !tokenAddressString || tokenAddressString === wBNBAddressString
      ? "BNB"
      : tokenAddressString;
  return `${firstPart}/${secondPart}`;
};

export default getLiquidityUrlPathParts;
