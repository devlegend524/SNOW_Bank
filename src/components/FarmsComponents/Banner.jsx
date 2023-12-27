import React, { useState, useEffect, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCopy } from "react-icons/fa";
import { getSNOWAddress, getWethAddress } from "utils/addressHelpers";
import { CHAIN_ID, TESTNET_CHAIN_ID, BASE_SWAP_URL, BASE_URL } from "config";
import { useNetwork } from "wagmi";
import { formatAddress } from "utils/customHelpers";
import { getScanTokenUrl } from "utils/getExplorerURL";
// import { useEthersProvider } from 'hooks/useEthers'

export default function FarmBanner() {
  const [isCopied, setIsCopied] = useState(false);
  const [snowAddress, setSnowAddress] = useState("Connect correct wallet");
  const { chain } = useNetwork();
  const token = getSNOWAddress();
  // const provider = useEthersProvider()

  const addWatchSNOWToken = useCallback(async () => {
    const provider = window.ethereum;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 my-16">
      <div className="text-center md:text-left">
        <h1 className="text-7xl">SNOW Bank</h1>
        <p className="mt-2">The best place to Stake Snow Tokens & Earn Yield</p>
      </div>
      <div className="snows  p-6">
        <div className="flex items-center justify-center gap-2">
          <a
            className="main_btn w-full"
            href={`${BASE_SWAP_URL}?inputCurrency=${getWethAddress()}&outputCurrency=${getSNOWAddress()}`}
            target="_blank"
          >
            Buy SNOW
          </a>
          <button
            onClick={addWatchSNOWToken}
            className="main_btn flex items-center justify-center w-full"
          >
            Add SNOW &nbsp;
            <img
              src="/assets/metamask.png"
              alt=""
              srcset=""
              className="w-6 h-6"
            />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <a
            className="w-100 flex items-center justify-center py-10 text-base hover:underline"
            href={`${
              chain && chain.id === CHAIN_ID ? getScanTokenUrl(snowAddress) : ""
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
  );
}
