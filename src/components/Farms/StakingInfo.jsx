import React, { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Button } from "components/UI/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMasterchef } from "hooks/useContract";
import { useFarmsWithBalance } from "hooks/useFarmsWithBalance";
import { harvestMany } from "utils/callHelpers";
import WILDXHarvestBalance from "./FarmStackingComponents/WILDXHarvestBalance";
import WILDXWalletBalance from "./FarmStackingComponents/WILDXWalletBalance";
import Loading from "components/Loading";
import CompoundModal from "./CompoundModal";
import BigNumber from "bignumber.js";
import { DEFAULT_TOKEN_DECIMAL } from "config";
import CurrentSaleTax from "./FarmStackingComponents/CurrentSaleTax";

export default function () {
  const [pendingTx, setPendingTx] = useState(false);
  const [compoundPendingTx, setCompoundPendingTx] = useState(false);
  const [open, setOpen] = useState(false);
  const [pids, setPids] = useState([]);

  const { address } = useAccount();
  const farmsWithBalance = useFarmsWithBalance();
  const masterChefContract = useMasterchef();

  const balancesWithValue = farmsWithBalance.filter((balanceType) =>
    balanceType.balance.gt(0)
  );
  const earningsSum = farmsWithBalance.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning.balance);
    if (earningNumber.eq(0)) {
      return accum;
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber();
  }, 0);
  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true);
    try {
      let _pids = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const farmWithBalance of balancesWithValue) {
        _pids.push(farmWithBalance.pid);
      }
      if (_pids.length > 0)
        // eslint-disable-next-line no-await-in-loop
        await harvestMany(masterChefContract, _pids, false, address);
    } catch (error) {
      console.log(error);
    }
    setPendingTx(false);
  }, [address, balancesWithValue, masterChefContract]);

  // const compoundAllFarms = useCallback(async () => {
  //   setCompoundPendingTx(true);
  //   try {
  //     let _pids = [];
  //     // eslint-disable-next-line no-restricted-syntax
  //     for (const farmWithBalance of balancesWithValue) {
  //       _pids.push(farmWithBalance.pid);
  //     }
  //     if (_pids.length > 0)
  //       // eslint-disable-next-line no-await-in-loop
  //       await harvestMany(masterChefContract, _pids, true, address);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setCompoundPendingTx(false);
  // }, [address, balancesWithValue, masterChefContract]);

  function openModal() {
    let _pids = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of balancesWithValue) {
      _pids.push(farmWithBalance.pid);
    }
    setPids(_pids);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className="flex-1 main_bg p-8 rounded-md">
      <div className="text-3xl text-end">Farms & Staking</div>
      <div className="flex justify-between flex-col md:flex-row">
        <div>
          <div className="text-base pb-2">WILDX to Harvest:</div>
          <div className="text-sm text-gray-300">
            <WILDXHarvestBalance farmsWithBalance={balancesWithValue} />
          </div>
          <div className="text-base pb-2">WILDX in Wallet:</div>
          <div className="text-sm text-gray-300">
            <WILDXWalletBalance />
          </div>
        </div>
        <div>
          {" "}
          <div className="text-base pt-5">Current Sales Tax:</div>
          <div className="mb-1">
            <CurrentSaleTax />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col md:flex-row justify-between gap-3">
        {address ? (
          <>
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
              style={{
                background: "#031531",
                color: "#ddd",
                fontWeight: 500,
              }}
            >
              {pendingTx ? (
                <Loading />
              ) : (
                `Harvest all ${balancesWithValue.length}`
              )}
            </Button>
            <Button
              id="compound-all"
              // disabled={balancesWithValue.length <= 0}
              onClick={openModal}
              width="100%"
              style={{
                background: "#031531",
                color: "#ddd",
                fontWeight: 500,
              }}
            >
              {compoundPendingTx ? (
                <Loading />
              ) : (
                `Compound all ${balancesWithValue.length}`
              )}
            </Button>
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
      {open && (
        <CompoundModal
          open={open}
          closeModal={closeModal}
          earnings={earningsSum}
          pid={pids}
          isAll={true}
        />
      )}
    </div>
  );
}
