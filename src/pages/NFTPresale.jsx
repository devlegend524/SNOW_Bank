import React, { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import {
  toReadableAmount,
  fromReadableAmount,
  didUserReject,
} from "utils/customHelpers";
import useRefresh from "hooks/useRefresh";
import PreslaeABI from "config/abis/presale.json";
import { getPresaleAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import NFTBanner from "components/Presale/NFTBanner";
import { usePresaleContract } from "hooks/useContract";
import LogoLoading from "components/LogoLoading";
import NFTCard from "components/Presale/NFTCard";
import { notify } from "utils/toastHelper";
import { getNFTContract } from "utils/contractHelpers";
import { useEthersProvider } from "hooks/useEthers";
import NFTCardLoading from "components/Presale/NFTCardLoading";

export default function NFTPresale() {
  const presaleContractAddress = getPresaleAddress();
  const provider = useEthersProvider();
  const NFTContract = getNFTContract(provider);
  const [pendingTx, setPendingTx] = useState(true);
  const { address } = useAccount();
  const { fastRefresh } = useRefresh();
  const [active, setActive] = useState(true);
  const [presaleData, setPresaleData] = useState({});
  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const calls = [
        {
          address: presaleContractAddress,
          name: "enabled",
          params: [],
        },
        {
          address: presaleContractAddress,
          name: "sale_finalized",
          params: [],
        },
        {
          address: presaleContractAddress,
          name: "NFTPrice",
          params: [],
        },
      ];

      try {
        const rawResults = await multicall(PreslaeABI, calls);
        rawResults.map((data, index) => {
          const newData =
            index <= 5
              ? {
                  [calls[index]["name"]]:
                    index >= 2 ? Number(data[0]) : data[0],
                }
              : index === 9
              ? { [calls[index]["name"]]: rawResults[index].toString() }
              : {
                  [calls[index]["name"]]: toReadableAmount(
                    rawResults[index].toString(),
                    18,
                    6
                  ),
                };

          setPresaleData((value) => ({ ...value, ...newData }));
        });
      } catch (e) {
        console.log("Fetch Farms With Balance Error:", e);
      }
    };

    fetchData();
  }, [fastRefresh]);

  useEffect(() => {
    async function fetchNFTs() {
      let nfts = [];
      try {
        if (active) {
          nfts = await NFTContract.walletOfOwner(presaleContractAddress);
        } else {
          nfts = address ? await NFTContract.walletOfOwner(address) : [];
        }
        setNFTs(nfts);
      } catch (error) {
        console.log(error);
      }
    }

    if (NFTContract) {
      fetchNFTs();
    }
  }, [active, address, fastRefresh]);

  return (
    <div className="container max-w-[1200px]">
      <NFTBanner />

      <div className="my-4 flex gap-3">
        <button
          onClick={() => setActive(true)}
          className={`snow_effect px-3 py-2 hover:bg-primary/40 transition ease-in-out ${
            active ? "bg-[#058ee7!important]" : ""
          }`}
        >
          Listed NFTs
        </button>
        <button
          onClick={() => setActive(false)}
          className={`snow_effect px-3 py-2 hover:bg-primary/40 transition ease-in-out  ${
            !active ? "bg-[#058ee7!important]" : ""
          }`}
        >
          My NFTs
        </button>
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt- 6 mx-auto`}
      >
        {!NFTs
          ? [9, 9, 9, 9, 9, 9, 9, 9, 9, 9].map((_, index) => {
              return <NFTCardLoading key={index} active={active} />;
            })
          : NFTs.map((item, index) => {
              return (
                <NFTCard
                  tokenId={Number(item)}
                  key={index}
                  presaleData={presaleData}
                  index={index}
                  active={active}
                />
              );
            })}
      </div>
    </div>
  );
}
