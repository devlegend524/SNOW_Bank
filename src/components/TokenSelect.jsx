import React, { useState, useEffect } from "react";
import { useEthersProvider } from "hooks/useEthers";
import { useAccount } from "wagmi";
import { getBalance } from "utils/balanceHalper";
import { FiHelpCircle } from "react-icons/fi";

export default function TokenSelect({
  setOpen,
  token,
  setAmount,
  selectOnly,
  setStates,
  amount,
  clearTimer,
  setTimer,
  type,
  setInsufficient,
  insufficient,
}) {
  const provider = useEthersProvider();
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [localAmount, setLocalAmount] = useState("");

  const handleMaxAmount = () => {
    setLocalAmount(Number(balance));
  };

  const checkAvailable = (value) => {
    if (Number(value) <= balance) {
      setStates(true);
      setInsufficient(false);
    } else {
      setStates(false);
      setInsufficient(true);
    }
  };

  const fetchBalance = async (token) => {
    const balance = await getBalance(address, token, provider);
    setBalance(balance);
    setStates(Number(balance) > 0);
    setLoading(false);
  };

  const handleChangeValue = (e) => {
    setTimer(e.target.value, type);
    setAmount(Number(e.target.value));
  };

  useEffect(() => {
    if (!selectOnly && !loading) {
      checkAvailable(localAmount);
    }
  }, [loading, token]);

  useEffect(() => {
    setLoading(true);
    fetchBalance(token);
  }, [token]);

  useEffect(() => {
    if (!selectOnly) {
      if (localAmount && localAmount !== 0 && localAmount !== "0") {
        setInsufficient(Number(balance) <= Number(localAmount));
      } else {
        setInsufficient(false);
      }
    }
  }, [balance]);

  if (selectOnly) {
    return (
      <>
        <div className="custom_input">
          <div className="token_select">
            <div
              onClick={() => {
                setOpen(true);
              }}
              className="flex items-center hover:bg-black transition ease-in-out rounded-full cursor-pointer p-2 bg-secondary"
            >
              {token.logo ? (
                <img className="w-8 h-8 rounded-full" src={token.logo} alt="" />
              ) : (
                <>
                  <FiHelpCircle className="w-7 h-7 rounded-full" />
                </>
              )}
              <span className="text-gray-200 w-16 text-center">
                {token?.symbol}
              </span>

              <img
                className="rounded-full"
                src="/images/arrow-down.png"
                alt=""
              />
            </div>
          </div>
          <div className="token_prices flex items-end flex-col relative ">
            <div className="text-[12px] text-gray-400 text-end flex min-w-max absolute -top-3.5">
              {loading ? (
                <div className="bg-secondary mt-[2px]  rounded h-[12px] w-[60px] animate-pulse"></div>
              ) : (
                <p className="text-[12px] text-gray-400 text-end flex">
                  {`Balance: ${balance ? balance : " 0.0"}`}
                </p>
              )}
            </div>
            {loading ? (
              <div className="bg-secondary rounded h-[24px] mt-1 w-[90px] animate-pulse"></div>
            ) : (
              <h1 className="text-xl text-gray-200 text-end flex min-w-max  items-center">
                {balance ? balance : " 0.0"}
              </h1>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="custom_input">
          <div className="token_select min-w-max mr-3">
            <div
              onClick={() => {
                setOpen(true);
              }}
              className="flex items-center hover:bg-black transition ease-in-out rounded-full cursor-pointer p-2 bg-secondary min-w-max mr-2"
            >
              {token.logo ? (
                <img className="w-8 h-8 rounded-full" src={token.logo} alt="" />
              ) : (
                <>
                  <FiHelpCircle className="w-7 h-7 rounded-full" />
                </>
              )}
              <span className="text-gray-200 w-16 text-center">
                {token?.symbol}
              </span>
              <img
                className="rounded-full"
                src="/images/arrow-down.png"
                alt=""
              />
            </div>
            <div
              onClick={handleMaxAmount}
              className="bg-secondary shadow-md shadow-gray hover:bg-black rounded-md px-2 py-1 text-[12px] transition ease-in-out"
            >
              max
            </div>
          </div>
          <div className="token_prices flex items-end flex-col relative w-full">
            <div className="flex absolute -top-3.5">
              {loading ? (
                <div className="bg-secondary mt-[2px]  rounded h-[12px] w-[60px] animate-pulse"></div>
              ) : (
                <p className="text-[12px] text-gray-400 text-end flex">
                  {`Balance: ${balance ? balance : "0.0"}`}
                </p>
              )}
            </div>
            <input
              type="number"
              className="text-xl text-gray-200 text-end flex items-center"
              placeholder="0.0"
              min={0}
              value={amount === 0 ? "" : amount}
              onKeyPress={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
              onKeyDown={() => clearTimer()}
              onChange={handleChangeValue}
            />
            {insufficient && (
              <p className="absolute -bottom-9  text-[12px] text-red-500">
                Insufficient Balance
              </p>
            )}
          </div>
        </div>
      </>
    );
  }
}
