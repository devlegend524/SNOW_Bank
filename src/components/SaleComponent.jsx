import React, { useState } from "react";
import { didUserReject, fromReadableAmount } from "utils/customHelpers";
import { useBalance, useAccount } from "wagmi";
import { notify } from "utils/toastHelper";
import { usePresaleContract } from "hooks/useContract";
import { SALE_PRICE } from "config";
import { MAX_PER_USER } from "config";
import LogoLoading from "./LogoLoading";

export default function SaleComponent({ saleData }) {
  const presaleContract = usePresaleContract();
  const [pendingTx, setPendingTx] = useState(false);
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  const handleChange = (value) => {
    setAmount(value);
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

    let ethPrice;
    const priceData = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    );
    const res = await priceData.json();
    if (res && res.USD) {
      ethPrice = res.USD;
    }

    if (!ethPrice) {
      notify("danger", "Can't get eth price.");
      return;
    }

    try {
      const ethAmountToSend = (amount * 12) / Number(ethPrice);
      if (Number(data?.formatted) <= Number(ethAmountToSend)) {
        notify("warning", "Insufficient Balance");
        return;
      }
      setPendingTx(true);
      console.log(data?.formatted)
      const tx = await presaleContract.buySNOW({
        from: address,
        value: fromReadableAmount(Number(ethAmountToSend).toFixed(5)),
      });
      await tx.wait();
      setPendingTx(false);
      notify("success", `You bought ${amount} SNOW successfully`);
    } catch (error) {
      console.log(error)
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
          <div className="my-8">
            <div className="flex justify-between mb-3 px-1">
              <div> Total Raised:</div>
              <div>{saleData?.total_deposited || "0"} ETH</div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div> Your Staked:</div>
              <div>{saleData?.user_deposits || "0"} ETH</div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>MAX Per User:</div>
              <div>
                {MAX_PER_USER} <span className="text-sm">SNOW</span>{" "}
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>Price:</div>
              <div>
                <p className="flex gap-1">
                  <span className="font-semibold">$ {SALE_PRICE}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>Balance:</div>
              <div>
                {Number(data?.formatted).toFixed(5) === "NaN"
                  ? "0.000"
                  : Number(data?.formatted).toFixed(5)}{" "}
                ETH
              </div>
            </div>
          </div>
          <input
            className="w-full rounded-md py-3 bg-primary/20 px-3 mb-3 hover:outline-none focus-visible:outline-none border border-secondary focus-visible:border-white/70 transition ease-in-out duration-300"
            type="number"
            placeholder="Input SNOW Amount to Buy."
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <button
          className="main_btn w-full mt-4"
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
