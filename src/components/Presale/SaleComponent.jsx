import React, { useState } from "react";
import { didUserReject, fromReadableAmount } from "utils/customHelpers";
import { useBalance, useAccount } from "wagmi";
import { notify } from "utils/toastHelper";
import { usePresaleContract } from "hooks/useContract";
import LogoLoading from "../LogoLoading";
import SNOW from "components/UI/SNOW";
import ETH from "components/UI/ETH";
import { useEffect } from "react";

export default function SaleComponent({ saleData }) {
  const presaleContract = usePresaleContract();
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const [ethPrice, setEthPrice] = useState(0.00006195);
  const [pendingTx, setPendingTx] = useState(false);
  const [ethAmount, setEthAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [snowAmount, setSnowAmount] = useState("");

  const handleChangeETH = (value) => {
    setAmount(value);
    setEthAmount(value);
    const ethSnowAmount = Number(((value * ethPrice) / 0.6).toFixed(5));
    setSnowAmount(ethSnowAmount);
  };

  const handleChangeSnow = (value) => {
    setSnowAmount(value);
    const ethBuyAmount = Number(((value * 0.6) / ethPrice).toFixed(5));
    setEthAmount(ethBuyAmount);
  };

  const getETHPrice = async () => {
    const priceData = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    const res = await priceData.json();
    if (res && res.USD) {
      ethPrice = res.USD;
      setEthPrice(Number(ethPrice));
    }
  };

  const handleBuySnow = async () => {
    if (!saleData?.enabled) {
      notify("error", "Presale is not started yet");
      return;
    }
    if (saleData?.sale_finalized) {
      notify("error", "Presale is ended");
      return;
    }

    if (ethPrice === 0) {
      notify("error", "ETH price fetch failed.");
      return;
    }

    if (!amount) {
      notify("error", "Please input the correct amount to buy.");
      return;
    }

    try {
      setPendingTx(true);
      const tx = await presaleContract.buySNOW({
        from: address,
        value: fromReadableAmount(Number(amount).toFixed(5)),
      });

      await tx.wait();
      setPendingTx(false);
      notify("success", `You bought ${amount} SNOW successfully`);
    } catch (error) {
      console.log(error);
      setPendingTx(false);
      if (didUserReject(error)) {
        notify("warning", "User Rejected transaction");
        return;
      } else {
        notify("warning", error.reason);
        return;
      }
    }
  };

  return (
    <>
      <div className="w-full snow_effect px-4 py-4">
        <div className="balance_form">
          <div className="mt-8 mb-6">
            <div className="flex justify-between mb-3 px-1">
              <div>Snow Price:</div>
              <div>
                <p className="flex gap-1">
                  <span className="font-semibold">
                    ${" "}
                    {saleData?.presalePriceOfToken
                      ? saleData?.presalePriceOfToken
                      : "0.00"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div> You Bought:</div>
              <div className="flex gap-1">
                {saleData?.SNOWOwned || "0.00"} <SNOW width={15} height={15} />
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>Balance:</div>
              <div className="flex gap-1">
                {Number(data?.formatted).toFixed(5) === "NaN"
                  ? "0.00"
                  : Number(data?.formatted).toFixed(5)}
                <ETH width={15} height={15} />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex gap-1 bg-primary/20 rounded-md border-secondary hover:border-white border duration-300 w-full">
              <img
                src="/assets/tokens/snow.png"
                className={`w-[38px] h-[38px] my-auto ml-1`}
              />

              <input
                className="w-full py-3.5 bg-transparent text-sm px-2 hover:outline-none focus-visible:outline-none focus-visible:border-white/70"
                type="number"
                placeholder="Input SNOW Amount To Buy."
                value={snowAmount}
                onChange={(e) => handleChangeSnow(e.target.value)}
              />
            </div>
            <div className="flex gap-1 bg-primary/20 rounded-md border-secondary hover:border-white border duration-300 w-full">
              <img
                src="/assets/tokens/weth.png"
                className={`w-[38px] h-[38px] my-auto ml-1`}
              />
              <input
                className="py-3.5 bg-transparent text-sm w-full px-2 hover:outline-none focus-visible:outline-none  focus-visible:border-white/70"
                type="number"
                placeholder="Input ETH Amount To Buy."
                value={ethAmount}
                onChange={(e) => handleChangeETH(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-primary/20 rounded-lg p-3 mb-3 text-sm">
            <div className="flex gap-2 justify-between mt-1">
              <p className="text-sm">SNOW</p>
              <div className="flex gap-1">
                <SNOW /> {snowAmount ? snowAmount : "0.00"}
              </div>
            </div>
            <div className="flex gap-2 justify-between mt-1">
              <p className="text-sm">ETH</p>
              <div className="flex gap-1">
                <ETH /> {ethAmount ? ethAmount : "0.00"}
              </div>
            </div>
            <div className="flex gap-2 justify-between mt-1">
              <p className="text-sm">ETH Price:</p>
              <div className="flex gap-1">$ ~{ethPrice}</div>
            </div>
            <hr className="mt-1 border-white/30 border-[0.5px]" />
            <div className="flex gap-2 justify-between mt-1">
              <p className="text-sm">USD Amount</p>
              <div className="flex gap-1">
                {ethAmount ? (
                  <>
                    {ethPrice} * {ethAmount} = $ ~
                    {(ethPrice * ethAmount).toFixed(2)}
                  </>
                ) : (
                  <>$ ~</>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          className="main_btn w-full mt-6 mb-2"
          onClick={() => handleBuySnow()}
          disabled={
            !saleData?.enabled ||
            saleData?.sale_finalized ||
            250 <= Number(saleData?.SNOWOwned) + Number(amount)
          }
        >
          {!saleData?.enabled
            ? "Presale is not started yet"
            : saleData?.sale_finalized
            ? "Presale has ended"
            : 250 <= Number(saleData?.SNOWOwned) + Number(amount)
            ? "Exceed Maximum Amount"
            : "BUY SNOW"}
        </button>
      </div>
      {pendingTx && <LogoLoading />}
    </>
  );
}
