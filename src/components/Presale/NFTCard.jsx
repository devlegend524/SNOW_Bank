import React, { useState, useEffect } from "react";
import { useNFTContract } from "hooks/useContract";
import { useAccount, useBalance } from "wagmi";
import { toReadableAmount, didUserReject } from "utils/customHelpers";
import useRefresh from "hooks/useRefresh";
import PreslaeABI from "config/abis/presale.json";
import { getPresaleAddress } from "utils/addressHelpers";
import { usePresaleContract } from "hooks/useContract";
import LogoLoading from "components/LogoLoading";
import { notify } from "utils/toastHelper";
import { useEthersProvider } from "hooks/useEthers";

export default function NFTCard({ tokenId, index, presaleData, active }) {
  const [tokenUri, setTokenUri] = useState("");
  const preslaeContractAddress = getPresaleAddress();
  const presaleContract = usePresaleContract();
  const provider = useEthersProvider();
  const nftContract = useNFTContract(provider);
  const [pendingTx, setPendingTx] = useState(false);
  const [delay, setDelay] = useState(true);
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const [type, setType] = useState(active);
  const NFTPrice = toReadableAmount(presaleData?.NFTPrice.toString(), 18);

  const handleBuyNFT = async () => {
    if (!presaleData?.enabled) {
      notify("error", "Presale is not started yet");
      return;
    }
    if (presaleData?.sale_finalized) {
      notify("error", "Presale is ended");
      return;
    }

    if (
      Number(data?.formatted) <=
      Number(toReadableAmount(presaleData.NFTPrice, 18))
    ) {
      notify("warning", "Insufficient Balance");
      return;
    }

    const isWhiteListed = await nftContract.whitelisted(address);

    try {
      if (!isWhiteListed) {
        await nftContract.whitelistUser(address);
      }
      setPendingTx(true);
      const tx = await presaleContract.buyNFT(tokenId, {
        from: address,
        value: presaleData.NFTPrice,
      });
      await tx.wait();
      setPendingTx(false);
      notify("success", `You bought SNOW NFT successfully`);
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

  const handleImageError = (event) => {
    event.target.src = "/assets/stickers/NFT.webp";
  };

  // const getTokenUri = async (id) => {
  //   const url = await nftContract.tokenURI(id);
  //   setTokenUri(url || "/assets/stickers/NFT.webp");
  // };

  // useEffect(() => {
  //   getTokenUri(tokenId);
  // }, [tokenId]);

  useEffect(() => {
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  }, []);

  return (
    <>
      <div
        className={`w-full min-h-[${
          type ? 337 : 227
        }px] p-6 rounded-lg snow_effect flex flex-col justify-between`}
      >
        {delay ? (
          <div className="mx-auto w-full h-[177px] w-[177px] bg-white/5 rounded-md animate-pulse"></div>
        ) : (
          <img
            // src={tokenUri}
            src={`/images/sn${index + 1}.png`}
            onError={handleImageError}
            alt="NFT"
            srcSet=""
            className="w-full border-opacity-30"
          />
        )}
        <div>
          <div className="flex justify-between px-2">
            <p>NFT ID: </p>
            <p>{tokenId}</p>
          </div>
          <div className="flex justify-between px-2">
            <p>Price: </p>
            <p>{NFTPrice} ETH</p>
          </div>
          {active && (
            <button
              onClick={handleBuyNFT}
              className="main_btn mx-auto mt-4 py-[9px!important]"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
      {pendingTx && <LogoLoading />}
    </>
  );
}
