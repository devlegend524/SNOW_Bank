import { useCallback } from "react";
import { compound, zap, zapForFarm } from "utils/callHelpers";
import { useMasterchef, useZapContract } from "./useContract";
import { useAccount } from "wagmi";

const useZap = () => {
  const { address } = useAccount();
  const zapContract = useZapContract();

  const handleZap = useCallback(
    async (tokenA, isNative, amount, tokenB, isNativeOut) => {
      await zap(
        zapContract,
        tokenA,
        isNative,
        amount,
        tokenB,
        isNativeOut,
        address
      );
    },
    [address, zapContract]
  );

  return { onZap: handleZap };
};

export const useZapForFarm = () => {
  const { address } = useAccount();
  const zapContract = useZapContract();

  const handleZap = useCallback(
    async (tokenA, isNative, amount, tokenB, pid) => {
      await zapForFarm(
        zapContract,
        tokenA,
        isNative,
        amount,
        tokenB,
        pid,
        address
      );
    },
    [address, zapContract]
  );

  return { onZapForFarm: handleZap };
};

export const useCompound = () => {
    const { address } = useAccount();
    const masterChefContract =  useMasterchef();

    const onCompound = useCallback(
        async (pid) => {
            await compound(
                masterChefContract,
                pid,
                address
            )
        },
        [address, masterChefContract]
    )

    return { onCompound: onCompound }

}



export default useZap;
