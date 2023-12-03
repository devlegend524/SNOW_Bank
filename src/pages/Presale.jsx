import React, { useState, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useEthersProvider, useEthersSigner } from "hooks/useEthers";
import { toReadableAmount } from "utils/customHelpers";
import ClaimComponent from "components/ClaimComponent";
import SaleComponent from "components/SaleComponent";
import useRefresh from "hooks/useRefresh";
import PresaleABI from "config/abis/presale.json";
import PresaleForkABI from "config/abis/presaleFork.json";
import { getPresaleAddress, getPresaleForkAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import { CountDownComponent } from "../components/CountDown";
import { getPresaleForkContract } from "utils/contractHelpers";

export default function Presale() {
  const preslaeContractAddress = getPresaleAddress();
  const preslaeContractForkAddress = getPresaleForkAddress();
  const { address } = useAccount();
  const { fastRefresh } = useRefresh();
  const signer = useEthersSigner()

  const [active, setActive] = useState(1);
  const [presaleData, setPresaleData] = useState({});
  const [ended, setEnded] = useState(false);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const calls = [
        {
          address: preslaeContractForkAddress,
          name: "enabled",
          params: [],
        },
        {
          address: preslaeContractForkAddress,
          name: "sale_finalized",
          params: [],
        },
        {
          address: preslaeContractForkAddress,
          name: "finishedTimestamp",
          params: [],
        },
        {
          address: preslaeContractForkAddress,
          name: "total_deposited",
          params: [],
        },
      ];

      try {
        const rawResults = await multicall(PresaleForkABI, calls);
        rawResults.map((data, index) => {
          const newData =
            index < 2
              ? { [calls[index]["name"]]: data[0] }
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
          address: preslaeContractForkAddress,
          name: "WILDOwned",
          params: [address],
        },
        {
          address: preslaeContractForkAddress,
          name: "user_withdraw_amount",
          params: [address],
        },
        {
          address: preslaeContractForkAddress,
          name: "getAmountToWithdraw",
          params: [address],
        },
        {
          address: preslaeContractForkAddress,
          name: "user_withdraw_timestamp",
          params: [address],
        },
        {
          address: preslaeContractForkAddress,
          name: "user_synced",
          params: [address],
        },
        {
          address: preslaeContractForkAddress,
          name: "user_first_claim",
          params: [address],
        },
      ];

      const calls2 = [
        {
          address: preslaeContractAddress,
          name: "user_deposits",
          params: [address],
        },
      ];

      try {
        const rawResults = await multicall(PresaleForkABI, calls);
        rawResults.map((data, index) => {
          console.log(Number(rawResults[index]));
          const newData = {
            [calls[index]["name"]]:
              index === 3
                ? Number(rawResults[index])
                : toReadableAmount(rawResults[index].toString(), 18, 6),
          };
          setPresaleData((value) => ({ ...value, ...newData }));
        });

        const rawResults2 = await multicall(PresaleForkABI, calls2);
        rawResults2.map((data, index) => {
          const newData2 = {
            [calls2[index]["name"]]: toReadableAmount(
              rawResults2[index].toString(),
              18,
              6
            ),
          };
          setPresaleData((value) => ({ ...value, ...newData2 }));
        });
      } catch (e) {
        console.log("Fetch Farms With Balance Error:", e);
      }
    };

    if (address) {
      fetchData();
    }
  }, [address]);

  useEffect(() => {

    if (presaleData && presaleData?.user_synced === 0 && signer && !synced) {
      setSynced(true)
      async function sync() {
        const calls = [
          {
            address: preslaeContractAddress,
            name: "user_deposits",
            params: [address],
          },
          {
            address: preslaeContractAddress,
            name: "user_withdraw_amount",
            params: [address],
          },
          {
            address: preslaeContractAddress,
            name: "WILDOwned",
            params: [address],
          },
        ];

        const rawResults = await multicall(PresaleForkABI, calls);
        const oPresaleContract = getPresaleForkContract(signer);
        await oPresaleContract.syncData(rawResults[0].toString(), rawResults[1].toString(), rawResults[2].toString())
      }
      sync();
    }
  }, [presaleData, signer]);

  return (
    <div className="w-full container max-w-[500px] mx-3">
      {!presaleData?.sale_finalized && !ended && (
        <>
          <p className="text-center text-3xl font-bold shadow-md shadow-black/50 py-3 bg-secondary/40 rounded-md mb-2 backdrop-blur-sm">
            BWiLD SALE ENDS IN:
          </p>
          <CountDownComponent setEnded={setEnded} />
        </>
      )}

      <div className="tab_panel mx-auto">
        <div
          className={`tab_button py-[2px!important]  ${
            active === 0
              ? "main_btn hover:scale-[100%!important] hover:bg-[white!important] hover:text-[black!important]"
              : ""
          }`}
          onClick={() => setActive(0)}
        >
          Sale
        </div>
        <div
          className={`tab_button py-[2px!important]  ${
            active === 1
              ? "main_btn hover:scale-[100%!important] hover:bg-[white!important] hover:text-[black!important]"
              : ""
          }`}
          onClick={() => setActive(1)}
        >
          Claim
        </div>
      </div>
      <div className="bg-secondary px-4 py-6 rounded-lg">
        {active === 0 ? (
          <SaleComponent saleData={presaleData} />
        ) : (
          <ClaimComponent saleData={presaleData} />
        )}
      </div>
      <img
        src="/assets/stickers/wild1.png"
        alt=""
        className="fixed animate-pulse duration-1000 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] -z-[999] sm:inline-block bottom-8 left-3"
      />
      <img
        src="/assets/stickers/wild2.png"
        alt=""
        className="fixed animate-pulse duration-1000 w-[150px] sm:w-[300px] md:w-[400px] lg:w-[500px] -z-[999] sm:inline-block bottom-8 right-3"
      />
    </div>
  );
}
