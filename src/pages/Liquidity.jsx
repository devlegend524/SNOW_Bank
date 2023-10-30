import React, { useState, useEffect } from "react";
import TokenSelect from "components/TokenSelect";
import TokenSelectModal from "components/TokenSelectModal";
import { getErc20Contract } from "utils/contractHelpers";
import { getZapAddress } from "utils/addressHelpers";
import { useEthersSigner } from "hooks/useEthers";
import { liquidityList } from "config/farms";
import { useRouterContract, useZapContract } from "hooks/useContract";
import { didUserReject } from "utils/customHelpers";
import { notify } from "utils/toastHelper";
import { useAccount } from "wagmi";
import { fromReadableAmount, toReadableAmount } from "utils/customHelpers";
import { ethers } from "ethers";

export default function Liquidity() {
  const [states, setStates] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [tokenA, setTokenA] = useState(liquidityList[2]);
  const [tokenB, setTokenB] = useState(liquidityList[0]);
  const [tokenAAmount, setTokenAAmount] = useState("");
  const [tokenBAmount, setTokenBAmount] = useState("");
  const [active, setActive] = useState(0);
  const [pendingFromApproveTx, setPendingFromApproveTx] = useState(false);
  const [pendingToApproveTx, setPendingToApproveTx] = useState(false);
  const [pendingTx, setPendingTx] = useState(false);
  const [allowanceFrom, setAllowanceFrom] = useState(0);
  const [allowanceTo, setAllowanceTo] = useState(0);
  const [direction, setDirection] = useState("sell");

  const { address } = useAccount();
  const zapAddress = getZapAddress();
  const signer = useEthersSigner();
  const zapContract = useZapContract();
  const routerContract = useRouterContract();

  const [status, setStatus] = useState({
    insufficientA: false,
    insufficientB: false,
    tokenA: false,
    tokenB: false,
    loading: false,
    approve: false,
  });

  const refresh = () => {
    setTokenAAmount("");
    setTokenBAmount("");
  };

  const getAllowance = async (token, type) => {
    let tokenContract;
    tokenContract = getErc20Contract(token.lpAddresses, signer);
    const tokenAllowance = await tokenContract.allowance(address, zapAddress, {
      from: address,
    });
    if (type === "from") setAllowanceFrom(tokenAllowance.toString());
    else setAllowanceTo(tokenAllowance.toString());
  };

  const handleApproveFromToken = async () => {
    try {
      if (
        Number(ethers.utils.formatUnits(allowanceFrom, "ether")) <
        Number(tokenAAmount)
      ) {
        console.log("approving...");
        setPendingFromApproveTx(true);
        let tokenContract;
        tokenContract = getErc20Contract(tokenA.lpAddresses, signer);
        await tokenContract.approve(zapAddress, ethers.constants.MaxUint256, {
          from: address,
        });
        setPendingFromApproveTx(false);
      }
    } catch (e) {
      console.log(e);
      if (didUserReject(e)) {
        notify("error", "User rejected transaction");
      }
      setPendingFromApproveTx(false);
    }
  };

  const handleApproveToToken = async () => {
    try {
      if (
        Number(ethers.utils.formatUnits(allowanceTo, "ether")) <
        Number(tokenBAmount)
      ) {
        console.log("approving...");
        setPendingToApproveTx(true);
        let tokenContract;
        tokenContract = getErc20Contract(tokenB.lpAddresses, signer);
        await tokenContract.approve(zapAddress, ethers.constants.MaxUint256, {
          from: address,
        });
        setPendingToApproveTx(false);
      }
    } catch (e) {
      console.log(e);
      if (didUserReject(e)) {
        notify("error", "User rejected transaction");
      }
      setPendingToApproveTx(false);
    }
  };

  const getAmount = async (amount, type) => {
    const amount_in = fromReadableAmount(amount, 18);
    try {
      if (type === "sell") {
        const amount_out = await routerContract.getAmountsOut(amount_in, [
          tokenA?.lpAddresses,
          tokenB?.lpAddresses,
        ]);
        setTokenAAmount(toReadableAmount(amount_out[1], 18));
      } else {
        const amount_out = await routerContract.getAmountsIn(amount_in, [
          tokenA?.lpAddresses,
          tokenB?.lpAddresses,
        ]);
        setTokenBAmount(toReadableAmount(amount_out[0], 18));
      }
    } catch (e) {
      console.log(e);
      return "unkown";
    }
  };

  const handleAddLiquidity = async () => {
    setPendingTx(true);
    try {
      console.log("adding liquidity...");
      const tx = await zapContract.addTaxFreeLiquidity(
        tokenA.lpAddresses,
        tokenB.lpAddresses,
        fromReadableAmount(tokenAAmount, 18),
        fromReadableAmount(tokenBAmount, 18)
      );
      await tx.wait();
      refresh();
    } catch (e) {
      console.log(e);
      if (didUserReject(e)) {
        notify("error", "User rejected transaction");
      }
    }
    setPendingTx(false);
  };

  const closeModalA = () => {
    setOpenA(false);
  };

  const closeModalB = () => {
    setOpenB(false);
  };

  const handleSetInsufficientA = (flag) => {
    setStatus({ ...status, insufficientA: flag });
  };

  const handleSetInsufficientB = (flag) => {
    setStatus({ ...status, insufficientB: flag });
  };

  useEffect(() => {
    if (direction === "sell") {
      if (Number(tokenAAmount) === 0) {
        setTokenAAmount("");
        setTokenBAmount("");
      } else {
        getAmount(tokenAAmount, "sell");
      }
    }
  }, [tokenAAmount, direction]);

  useEffect(() => {
    if (direction === "buy") {
      if (Number(tokenBAmount) === 0) {
        setTokenAAmount("");
        setTokenBAmount("");
      } else {
        getAmount(tokenBAmount, "buy");
      }
    }
  }, [tokenBAmount, direction]);
  useEffect(() => {
    if (address && signer) {
      getAllowance(tokenA, "from");
      getAllowance(tokenB, "to");
    }
  }, [address, signer]);
  return (
    <div className="flex justify-center items-center flex-col  min-h-[calc(100vh-200px)] w-full">
      <div className="tab">
        <div className="flex justify-center">
          <div className="tab_panel">
            <div
              className={`tab_button ${active === 0 ? "active" : ""}`}
              onClick={() => setActive(0)}
            >
              Add Liquidity
            </div>
            <div
              className={`tab_button ${active === 1 ? "active" : ""}`}
              onClick={() => setActive(1)}
            >
              Remove Liquidity
            </div>
          </div>
        </div>
        <div className="flex justify-center"></div>
      </div>
      <div className="card">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            {/* <button className="action_btn"><img src="/images/chart.png" alt="" /></button> */}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="block">
              <h1 className="text-center text-yellow-main text-2xl">
                Add Liquidity
              </h1>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <button className="action_btn">
              <img src="/images/refresh.png" alt="" />
            </button>
            <button className="action_btn ml-3">
              <img src="/images/setting.png" alt="" />
            </button>
          </div>
        </div>

        <p className="text-center text-gray-400">
          Receive LP tokens and earn trading fees
        </p>
        <div className="block w-full">
          <p className="text-sm text-gray-300">Select Token</p>
          <TokenSelect
            token={tokenA}
            setOpen={setOpenA}
            selectOnly={false}
            amount={tokenAAmount}
            setAmount={setTokenAAmount}
            setStates={setStates}
            setInsufficient={handleSetInsufficientA}
            setDirection={setDirection}
          />

          <div className="flex justify-center">
            <div className="swap_btn_box2">CHOOSE A VALID PAIR</div>
          </div>

          <TokenSelect
            token={tokenB}
            setOpen={setOpenB}
            amount={tokenBAmount}
            setAmount={setTokenBAmount}
            selectOnly={false}
            setStates={setStates}
            setInsufficient={handleSetInsufficientB}
            setDirection={setDirection}
          />
        </div>
        {Number(tokenAAmount) > 0 &&
        Number(allowanceFrom) <= Number(tokenAAmount) ? (
          <button
            className="custom_btn  mt-5 hover:bg-hover  flex justify-center disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700"
            onClick={handleApproveFromToken}
          >
            Enable {tokenA.lpSymbol}
          </button>
        ) : (
          ""
        )}
        {Number(tokenBAmount) > 0 &&
        Number(allowanceTo) <= Number(tokenBAmount) ? (
          <button
            className="custom_btn  mt-5 hover:bg-hover  flex justify-center disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700"
            onClick={handleApproveToToken}
          >
            Enable {tokenB.lpSymbol}
          </button>
        ) : (
          ""
        )}
        <button className="custom_btn  mt-5 hover:bg-hover  flex justify-center disabled:opacity-50 disabled:hover:scale-100  w-full rounded-lg hover:scale-105 transition ease-in-out p-[8px] bg-secondary-700">
          Add Liquidity
        </button>
      </div>
      {/* TokenA modal */}
      <TokenSelectModal
        open={openA}
        closeModal={closeModalA}
        setToken={setTokenA}
        disabledToken={tokenA?.lpSymbol}
        tokens={[liquidityList[2]]}
      />
      {/* TokenB modal */}
      <TokenSelectModal
        open={openB}
        closeModal={closeModalB}
        setToken={setTokenB}
        disabledToken={tokenB?.lpSymbol}
        tokens={[liquidityList[0]]}
      />
    </div>
  );
}
