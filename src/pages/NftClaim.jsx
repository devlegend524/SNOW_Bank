import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useNFTContract } from "hooks/useContract";
import NFTCard from "components/NFTCard";
import { notify } from "utils/toastHelper";
import useRefresh from "hooks/useRefresh";
import Loading from "components/Loading";
import { didUserReject } from "utils/customHelpers";
import { useEthersSigner } from "hooks/useEthers";
import RecentBuys from "components/RecentBuys";
export default function Zap() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState(0);
  const [myTokenIds, setMyTokenIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState(true)
  const nftContract = useNFTContract();
  const { fastRefresh } = useRefresh();
  const signer = useEthersSigner();

  const getAvailableNFTs = async () => {
    const availableNFTs = await nftContract.getMaximumAmountCanMint(address);
    const myNFTs = await nftContract.balanceOf(address);
    if (Number(myNFTs) > 0) {
      const tokenIds = await nftContract.walletOfOwner(address);
      setMyTokenIds(tokenIds);
    }

    setNfts(Number(availableNFTs));
  };

  const claimNFT = async () => {
    if (nfts < 1) return;
    try {
      setIsProcessing(true);
      const tx = await nftContract.mint();
      await tx.wait();
      setIsProcessing(false);
      notify("success", "you have successfully claimed an NFT");
      await getAvailableNFTs();
    } catch (e) {
      if (didUserReject(e)) {
        notify("error", "User Rejected Transaction");
      } else {
        console.log(e);
        notify("error", e.reason);
      }
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (signer && address) getAvailableNFTs();
  }, [fastRefresh, signer, address]);

  return (
    <div className="container">
      <div className="flex my-6 py-1 bg-[#0d223de8] w-fit mx-auto rounded-full">
        <button onClick={() => setStats(true)} className="text-center w-32 py-2 px-4 border-r rounded-l-full border-[#243753e8]  hover:bg-[#142235e8]  transition ease-in-out">My NFTs</button>
        <button onClick={() => setStats(false)} className="text-center w-32 py-2 px-4 hover:bg-[#142235e8] transition ease-in-out rounded-r-full">Recent buys</button>
      </div>

      {
        !stats ? <RecentBuys last={12} /> : <>

          <div className="flex justify-center gap-4 mt-16">
            {myTokenIds && myTokenIds.length > 0 ? (
              myTokenIds.map((tokenId, index) => (
                <div className="w-[200px] h-[200px]">
                  <NFTCard key={index} tokenId={tokenId} />
                </div>
              ))
            ) : (
              <div className="w-full max-w-[300px] max-h-[400px] p-4 rounded-lg bg-[#0d223de8]">
                <img
                  src={"/logo.jpg"}
                  alt="token"
                  className="w-full rounded-full border-opacity-30"
                />
              </div>
            )}
          </div>

          <div className="mt-12 md:mt-24">
            {address && !nfts && (
              <p className="mt-3 text-center text-2xl">
                You don't have any NFTs to claim.
              </p>
            )}

            {address && nfts ? (
              <p className="mt-3 text-center text-2xl">
                You have {nfts} NFT(s) to claim.
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-center items-center pb-16 m-2 mt-12">
            <button
              className="main_btn rounded-xl w-full max-w-sm flex justify-center px-6 py-3 hover:scale-105 transition ease-in-out"
              // disabled={!address && !nfts}
              onClick={() => claimNFT()}
            >
              {isProcessing ? (
                <Loading title="Claiming NFT..." />
              ) : nfts ? (
                "Claim NFT"
              ) : (
                "Nothing to claim"
              )}
            </button>
          </div>
        </>
      }


    </div>
  );
}
