import React from "react";
import { useTotalSupply } from "hooks/useTokenBalance";
import { usePriceXXWiLDUsdc, useTotalValue } from "state/hooks";
import CardValue from "./Staking/CardValue";
import { convertCurrency, toReadableAmount } from "utils/customHelpers";
import { useContractRead, erc20ABI } from "wagmi";
import { getXXWiLDAddress, getWethAddress } from "utils/addressHelpers";
import wildABI from "config/abis/wild.json";

export default function TotalValueLocked() {
  const tvlData = useTotalValue();
  const tvl = tvlData
    ? tvlData.toLocaleString("en-US", { maximumFractionDigits: 1 })
    : 0;
  const liquidity = usePriceXXWiLDUsdc()[1];
  const marketCap = usePriceXXWiLDUsdc()[2];

  const totalSupply = useTotalSupply();
  // 0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb
  const tokenABalanceRead = useContractRead({
    address: getXXWiLDAddress(),
    abi: wildABI,
    functionName: "balanceOf",
    args: ["0x000000000000000000000000000000000000dead"],
    chainId: 359,
  });
  const pWildBalanceRead = useContractRead({
    address: getXXWiLDAddress(),
    abi: wildABI,
    functionName: "balanceOf",
    args: ["0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb"],
    chainId: 359,
  });
  const wethBalanceRead = useContractRead({
    address: getWethAddress(),
    abi: erc20ABI,
    functionName: "balanceOf",
    args: ["0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb"],
    chainId: 359,
  });

  const totalMinted =
    totalSupply - toReadableAmount(tokenABalanceRead?.data, 18);
  return (
    <div className="flex-1 bg-secondary p-8 rounded-md ">
      <div className="text-3xl text-right  font-semibold text-symbol">
        Total Value Locked
      </div>
      <div className="mb-5">
        {tvlData !== null ? (
          <div color="#fff" className="text-2xl font-semibold text-right pb-3">
            {`$${tvl}`} staked
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="text-3xl text-right mb-5">XXWiLD Stats</div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Liquidity</p>
          <div className="h-30 ">
            {liquidity > 0 ? (
              <span className="text-[20px] font-semibold">
                $ {convertCurrency(liquidity)}
              </span>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Market Cap</p>
          <div className="h-30 ">
            {marketCap > 0 ? (
              <span className="text-[20px] font-semibold">
                $ {convertCurrency(marketCap)}
              </span>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Total Burned</p>
          <div>
            {toReadableAmount(tokenABalanceRead?.data, 18) && (
              <CardValue
                fontSize="20px"
                decimals={1}
                value={Number(toReadableAmount(tokenABalanceRead?.data, 18))}
                color="#fffff"
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Circulating Supply</p>
          <div>
            {totalSupply && (
              <CardValue
                fontSize="20px"
                value={totalMinted}
                decimals={1}
                color="#fffff"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
