import React, { useState,  useEffect } from "react";
import { formatAddress } from "utils/customHelpers";
import { getPresaleAddress } from "utils/addressHelpers";
import { useBalance, useAccount } from "wagmi";
import {
  privateWILDPrice,
  BASE_EXPLORER
} from "config";
import { notify } from "utils/toastHelper";

export default function SaleComponent({
  totalRaised,
  isPrivateParticipant,
  buyWILDToken,
  userDeposited,
  started,
  finished,
}) {
  const [amount, setAmount] = useState('');

  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  const handleChange = (value) => {
    setAmount(value);
  };


  const handleBuyWild = () => {
    if (!started) {
      notify("error", "Presale is not started yet");
      return;
    }
    if (finished) {
      notify("error", "Presale is ended");
      return;
    }

    if (Number(data?.formatted) < Number(amount)) {
      notify("warning", "Insufficient Balance");
      return;
    }
    buyWILDToken(amount);
  };

  return (
    <div>
      <div className="balance_form">
        <div className="my-8">
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
            <div> Total Raised:</div>
            <div>{totalRaised} ETH</div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
            <div> Your Commited:</div>
            <div>{userDeposited} ETH</div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
            <div> Token Sale Contract:</div>
            <div>
              <a
                href={`${BASE_EXPLORER}/address/${getPresaleAddress()}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-symbol"
              >
                {formatAddress(getPresaleAddress(), 4)}
              </a>
            </div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
            <div> Price Per WILD:</div>
            <div> <p className="flex gap-1">
              <span
                className={
                  isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                ${privateWILDPrice}
              </span></p></div>
          </div>
          <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
            <div> Your ETH Balance:</div>
            <div>
              {Number(data?.formatted).toFixed(5) === "NaN"
                ? "0.000"
                : Number(data?.formatted).toFixed(5)}{" "}
              ETH
            </div>
          </div>
        </div>
        <div>
          <input
            className="w-full rounded-md py-1 bg-primary/20 px-3 mb-3 hover:outline-none focus-visible:outline-none border border-symbol/70"
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
      <button
        className="main_btn w-full py-[3px!important] my-2"
        onClick={() => handleBuyWild()}
        disabled={ !started || finished ? "dissabled" : ""}
      >
        { !started
          ? "Presale is not started yet"
          : finished
          ? "Preslae is ended"
          : "BUY WILD"}
      </button>
    </div>
  );
}
