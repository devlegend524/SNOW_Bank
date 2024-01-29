import React from "react";

import { useFarmsWithBalance } from "hooks/useFarmsWithBalance";
import SNOWHarvestBalance from "./Staking/SNOWHarvestBalance";
import SNOWWalletBalance from "./Staking/SNOWWalletBalance";
import CurrentSaleTax from "./Staking/CurrentSaleTax";

export default function FarmStaking() {
  const farmsWithBalance = useFarmsWithBalance();
  const balancesWithValue = farmsWithBalance.filter((balanceType) =>
    balanceType.balance.gt(0)
  );

  return (
    <div className="flex-1 p-8 rounded-md ">
      <div className="text-3xl text-end font-semibold text-symbol mb-5 h-3.5">
        Farms & Staking
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div>
          <div className="text-base pb-2 font-semibold">SNOW to Harvest:</div>
          <div className="text-sm text-gray-300">
            <SNOWHarvestBalance farmsWithBalance={balancesWithValue} />
          </div>
          <div className="text-base pb-2 font-semibold mt-5">
            SNOW in Wallet:
          </div>
          <div className="text-sm text-gray-300">
            <SNOWWalletBalance />
          </div>
        </div>
        <div>
          <div className="text-base font-semibold text-right">
            Current Sales Tax:
          </div>
          <div className="mb-1">
            <div className="flex justify-end">
              <CurrentSaleTax />
            </div>

            <span className="text-[11px] text-right">
              ( Sales tax burns all of the SNOW automatically. <br /> The sales
              tax will drop over the next week to 8% )
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
