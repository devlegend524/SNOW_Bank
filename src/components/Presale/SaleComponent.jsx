import React, { useState } from "react";
import { didUserReject, fromReadableAmount } from "utils/customHelpers";
import { useBalance, useAccount } from "wagmi";
import { notify } from "utils/toastHelper";
import { usePresaleContract } from "hooks/useContract";
import LogoLoading from "../LogoLoading";
import SNOW from "components/UI/SNOW";
import ETH from "components/UI/ETH";

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
          <div className="my-8">
            <div className="flex justify-between mb-3 px-1">
              <div>Price:</div>
              <div>
                <p className="flex gap-1">
                  <span className="font-semibold">
                   {saleData?.presalePriceOfToken * 100} cents
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div> You bought:</div>
              <div className="flex gap-1">
                {saleData?.SNOWOwned || "0"} <SNOW width={15} height={15} />
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>MAX Per User:</div>
              <div className="flex gap-1">
                {saleData?.MAX_AMOUNT} <SNOW width={15} height={15} />
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div> Total Raised:</div>
              <div className="flex gap-1">
                {saleData?.total_deposited || "0"}{" "}
                <ETH width={15} height={15} />{" "}
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>Balance:</div>
              <div className="flex gap-1">
                {Number(data?.formatted).toFixed(5) === "NaN"
                  ? "0.000"
                  : Number(data?.formatted).toFixed(5)}
                <ETH width={15} height={15} />
              </div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>ETH Price:</div>
              <div className="flex gap-1">
                {Number(data?.formatted).toFixed(5) === "NaN"
                  ? "0.000"
                  : Number(data?.formatted).toFixed(5)}
                <ETH width={15} height={15} />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-1 bg-primary/20 rounded-md border-secondary hover:border-white border duration-300 w-full">
              <img
                src="/assets/tokens/snow.png"
                className={`w-[38px] h-[38px] my-auto ml-1`}
              />

              <input
                className="w-full py-3.5 bg-transparent text-sm px-2 hover:outline-none focus-visible:outline-none focus-visible:border-white/70"
                type="number"
                placeholder="Input SNOW Amount To Buy."
                value={amount}
                onChange={(e) => handleChange(e.target.value)}
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
                value={amount}
                onChange={(e) => handleChange(e.target.value)}
              />
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
