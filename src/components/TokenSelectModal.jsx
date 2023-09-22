import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { tokens } from "config/tokens";
import TokenItem from "./TokenItem";
import { isAddress } from "web3-validator";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";
import { useEthersProvider } from "hooks/useEthers";

export default function TokenSelectModal({
  open,
  closeModal,
  setToken,
  disableAddress,
  selected,
}) {
  const provider = useEthersProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [tokenLists, setTokenLists] = useState();
  const localTokens = JSON.parse(localStorage.getItem("tokens"));

  const addToken = async (address) => {
    try {
      const tokenContract = new ethers.Contract(address, erc20ABI, provider);
      const symbol = await tokenContract.symbol();
      const decimals = await tokenContract.decimals();

      const newToken = {
        symbol: symbol,
        address: address,
        decimals: decimals,
        logo: "",
      };
      setTokenLists([newToken]);
      if (localTokens) {
        let temp = localTokens;
        temp.push(newToken);
        localStorage.setItem("tokens", JSON.stringify(temp));
      } else {
        localStorage.setItem("tokens", JSON.stringify([newToken]));
      }
    } catch (e) {
      setTokenLists([]);
    }
  };

  const filterToken = (e) => {
    let temp = tokens;
    if (localTokens) {
      temp = temp.concat(localTokens);
    }
    if (!isAddress(e.target.value)) {
      const tokenArr = temp.filter(
        (token) =>
          token?.symbol.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
      );

      if (
        e.keyCode === 13 &&
        tokenArr.length === 1 &&
        tokenArr[0]["address"].toString() !== disableAddress
      ) {
        handleToken(tokenArr[0]);
      }
      setTokenLists(tokenArr);
    } else {
      const tokenArr = temp.filter(
        (token) =>
          token?.address.toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1
      );

      if (
        e.keyCode === 13 &&
        tokenArr.length === 1 &&
        tokenArr[0]["address"].toString() !== disableAddress
      ) {
        handleToken(tokenArr[0]);
      }

      if (tokenArr.length === 0) {
        addToken(e.target.value);
      } else {
        setTokenLists(tokenArr);
      }
    }
  };

  const handleToken = (value) => {
    setToken(value);
    closeModal();
  };

  useEffect(() => {
    setIsOpen(open);
    if (open) {
      if (localTokens) {
        const res = tokens.concat(localTokens);
        setTokenLists(res);
      } else {
        setTokenLists(tokens);
      }
    }
  }, [open]);

  useEffect(() => {
    if (localTokens) {
      const res = tokens.concat(localTokens);
      setTokenLists(res);
    } else {
      setTokenLists(tokens);
    }
  }, []);

  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#16171E",
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => closeModal()}
        ariaHideApp={false}
        style={customStyle}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between border-b border-yellow-500 py-4">
          <h1 className="text-xl text-yellow-main">Select Token</h1>
          <button
            className="text-2xl text-yellow-main"
            onClick={() => closeModal()}
          >
            &times;
          </button>
        </div>
        <input
          type="text"
          autoFocus
          onKeyUp={(e) => filterToken(e)}
          placeholder="Enter name or address"
          className="bg-main-100 w-full h-12 rounded-md my-3 p-3 text-xl focus:outline-none text-white"
        />
        <div className="text-gray-200 mb-2">Common tokens</div>

        <ul className="token_lists px-1">
          {tokenLists?.length ? (
            tokenLists.map((token, key) => {
              return (
                <TokenItem
                  key={key}
                  disableAddress={disableAddress}
                  token={token}
                  handleToken={handleToken}
                  selected={selected === token.address}
                />
              );
            })
          ) : (
            <div className="text-center text-xl text-red-600 py-3">
              The token does exist!
            </div>
          )}
        </ul>
      </Modal>
    </div>
  );
}
