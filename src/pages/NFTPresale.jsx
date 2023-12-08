import React, { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { toReadableAmount, fromReadableAmount, didUserReject } from "utils/customHelpers";
import useRefresh from "hooks/useRefresh";
import PreslaeABI from "config/abis/presale.json";
import { getPresaleAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
// import { CountDownComponent } from "../components/CountDown";
// import { BASE_EXPLORER } from "config";
// import Tab from "components/Presale/Tab";
import PresaleDetails from "components/Presale/PresaleDetails";
import NFTBanner from "components/Presale/NFTBanner";
import { usePresaleContract } from "hooks/useContract";
import LogoLoading from "components/LogoLoading";
import NFTCard from "components/NFTCard";
// import LogoLoading from "components/LogoLoading";
import { notify } from "utils/toastHelper";

export default function NFTPresale() {
  const preslaeContractAddress = getPresaleAddress();
  const presaleContract = usePresaleContract();
  const [pendingTx, setPendingTx] = useState(false);
  const { address } = useAccount();
  const { fastRefresh } = useRefresh();
  const { data } = useBalance({
    address: address,
  });

  const [active, setActive] = useState(0);
  const [presaleData, setPresaleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const calls = [
        {
          address: preslaeContractAddress,
          name: "enabled",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "sale_finalized",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "finishedTimestamp",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "NFTBoughtTimestamp",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "presalePriceOfToken",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "rate",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "MAX_AMOUNT",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "total_deposited",
          params: [],
        },
        {
          address: preslaeContractAddress,
          name: "NFTPrice",
          params: [],
        },
        // {
        //   address: preslaeContractAddress,
        //   name: "soldedNFTs",
        //   params: [],
        // },
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
    const fetchData = async () => {
      const calls = [
        {
          address: preslaeContractAddress,
          name: "user_deposits",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "SNOWOwned",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "user_withdraw_amount",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "user_withdraw_timestamp",
          params: [address],
        },
        {
          address: preslaeContractAddress,
          name: "getAmountToWithdraw",
          params: [address],
        },
      ];

      try {
        const rawResults = await multicall(PreslaeABI, calls);
        rawResults.map((data, index) => {
          const newData = {
            [calls[index]["name"]]:
              index === 3
                ? Number(rawResults[index])
                : toReadableAmount(rawResults[index].toString(), 18, 6),
          };
          setPresaleData((value) => ({ ...value, ...newData }));
        });
      } catch (e) {
        console.log("Fetch Farms With Balance Error:", e);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address]);

  const handleBuyNFT = async () => {
    if (!presaleData?.enabled) {
      notify("error", "Presale is not started yet");
      return;
    }
    if (presaleData?.sale_finalized) {
      notify("error", "Presale is ended");
      return;
    }

    if (Number(data?.formatted) <= Number(presaleData.NFTPrice)) {
      notify("warning", "Insufficient Balance");
      return;
    }

    console.log(fromReadableAmount(presaleData.NFTPrice))

    try {
      setPendingTx(true);
      const tx = await presaleContract.buySNOW({
        from: address,
        value: fromReadableAmount(presaleData.NFTPrice),
        gasLimit: 1000000
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

  // console.log(presaleData, '----')

  return (
    <div className="container max-w-[1200px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NFTBanner />
        <div className="snow_effect rounded-md w-full mt-12 flex flex-col justify-between">
          <img
            src="/assets/stickers/sticker4.webp"
            alt=""
            className="w-[80%] mx-auto"
          />
          <button className="main_btn mx-auto my-auto" onClick={handleBuyNFT}>
            Buy Today's NFT
          </button>
        </div>
      </div>

      <p className="text-center text-white font-bold text-4xl my-6">
        Saled NFTs
      </p>
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt- 6 mx-auto`}
      >
        {Array.from({ length: 10 }, (_, index) => {
          return <NFTCard tokenId={index} key={index} />;
        })}
      </div>
      {pendingTx && <LogoLoading title="Buying NFT..." />}
    </div>
  );
}
