import React, { useState, useEffect } from "react";
import { getBalance } from "utils/balanceHalper";
import { ImSpinner9 } from "react-icons/im";
import { useEthersProvider } from "hooks/useEthers";
import { useAccount } from "wagmi";
import { FiHelpCircle } from "react-icons/fi";

export default function TokenItem({ token, disableAddress, handleToken }) {
  const provider = useEthersProvider();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetch() {
      setLoading(true);

      const balance = await getBalance(address, token, provider);
      setBalance(balance);
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <>
      <li
        className={`flex p-2 justify-between items-center border border-secondary transition ease-in-out relative  ${
          token.address === disableAddress
            ? "bg-black opacity-40"
            : "hover:bg-black hover:bg-opacity-40"
        }`}
        onClick={(e) => {
          token.address !== disableAddress && handleToken(token);
        }}
      >
        <div className={`flex items-center `}>
          {token.logo ? (
            <img className="w-8 h-8 rounded-full" src={token.logo} alt="" />
          ) : (
            <>
              <FiHelpCircle className="w-8 h-8 rounded-full" />
            </>
          )}

          <div className="block ml-3 py-1">
            <h1 className="text-yellow-main text-base">{token?.symbol}</h1>
            <p className="text-gray-400 text-sm">{token.title}</p>
          </div>
        </div>
        {!loading ? (
          <p className={`text-[11px] text-gray-400`}>
            {Number(balance).toFixed(2)}
          </p>
        ) : (
          <div>
            <ImSpinner9 className="text-gray-500 animate-spin" />
          </div>
        )}
      </li>
    </>
  );
}
