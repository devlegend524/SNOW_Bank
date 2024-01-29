import React, { useState, useEffect, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import { getSNOWAddress, getWethAddress } from "utils/addressHelpers";
import { CHAIN_ID, TESTNET_CHAIN_ID, BASE_SWAP_URL, BASE_URL } from "config";
import { useNetwork } from "wagmi";
import { formatAddress } from "utils/customHelpers";
import { getScanTokenUrl } from "utils/getExplorerURL";
import FarmStaking from "components/FarmsComponents/StakingInfo";
import TotalValueLocked from "components/FarmsComponents/TotalValueLocked";
import DonutChart from "react-donut-chart";

export default function FarmBanner() {
  const [isCopied, setIsCopied] = useState(false);
  const [snowAddress, setSnowAddress] = useState("Connect correct wallet");
  const { chain } = useNetwork();
  const token = getSNOWAddress();
  // const provider = useEthersProvider()

  const addWatchSNOWToken = useCallback(async () => {
    const provider = window.bnbereum;
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        await provider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: token,
              symbol: "SNOW",
              decimals: "18",
              image: `${BASE_URL}/assets/tokens/snow.png`,
            },
          },
        });

        // if (wasAdded) {
        //   console.log('Token was added')
        // }
      } catch (error) {
        console.log("error", error);
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, []);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (chain && (chain.id === CHAIN_ID || chain.id === TESTNET_CHAIN_ID)) {
      const addr = getSNOWAddress();
      setSnowAddress(addr);
    }
  }, [chain]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:my-16 my-6 snows p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="sm:text-7xl text-5xl text-center mt-3">SNOW Bank</h1>
        <p className="my-3">The best place to Stake Snow Tokens & Earn Yield</p>
        <div className="mt-8 w-full">
          <div className="flex items-center justify-center gap-2 w-full sm:px-4">
            <button
              disabled
              className="w-full h-[40px!important]  box-btn-stake py-[8px!important]"
              // href={`${BASE_SWAP_URL}?inputCurrency=${getWethAddress()}&outputCurrency=${getSNOWAddress()}`}
              target="_blank"
            >
              Buy SNOW
            </button>
            <button
              onClick={addWatchSNOWToken}
              className="w-full h-[40px!important]  box-btn-stake flex gap-1 justify-center py-[8px!important]"
            >
              Add SNOW &nbsp;
              <img
                src="/assets/metamask.png"
                alt=""
                className="w-6 h-6"
              />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="w-100 flex items-center justify-center py-6 text-base hover:underline"
              href={`${
                chain && chain.id === CHAIN_ID
                  ? getScanTokenUrl(snowAddress)
                  : ""
              }`}
              target="_blank"
            >
              <span className="hidden xl:block">
                {formatAddress(snowAddress, 10)}
              </span>
              <span className="block xl:hidden">
                {formatAddress(snowAddress, 6)}
              </span>
              &nbsp;
              <FaExternalLinkAlt color="gray" />
              <span></span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <CopyToClipboard text={snowAddress} onCopy={handleCopy}>
              <span className="flex items-center cursor-pointer">
                {isCopied === true ? "Copied" : "Copy Address"} &nbsp;{" "}
                <FaRegCopy color="gray" />
              </span>
            </CopyToClipboard>
            {/* <button className='flex items-center justify-center'>
                  Copy Adress &nbsp; <FaRegCopy color='gray' />
                </button> */}
          </div>
        </div>
      </div>

      <div className="p-4 flex justify-center my-3">
        <DonutChart
          key="donatChat"
          className="w-full h-[fit-content!important]"
          strokeColor="#ffffff"
          colors={["#3498db", "white", "#f0b90b", "#0bf01d", "#444544c7"]}
          data={[
            {
              label: "Master Chef",
              value: 60,
            },
            {
              label: "SNOW/WBNB",
              value: 15,
            },
            {
              label: "Other Investors",
              value: 15,
            },
            {
              label: "You",
              value: 0,
            },
            {
              label: "Total Burned",
              value: 20,
            },
          ]}
        />
      </div>

      {/* <FarmStaking />
        <TotalValueLocked /> */}
    </div>
  );
}
