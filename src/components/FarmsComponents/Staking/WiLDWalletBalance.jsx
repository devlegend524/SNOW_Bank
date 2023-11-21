import React from "react";
import useTokenBalance from "hooks/useTokenBalance";
import { getXXWiLDAddress } from "utils/addressHelpers";
import { toReadableAmount } from "utils/customHelpers";
import { BigNumber } from "bignumber.js";
import CardValue from "./CardValue";
import CardUsdValue from "./CardUsdValue";
import { useEthersSigner } from "hooks/useEthers";
import { usePriceXXWiLDUsdc } from "state/hooks";

const WiLDWalletBalance = () => {
  const signer = useEthersSigner();
  const { balance } = useTokenBalance(getXXWiLDAddress());
  const wildPriceUsdc = usePriceXXWiLDUsdc()[0];
  const usdBalance = new BigNumber(
    toReadableAmount(balance.toString(), 18)
  ).multipliedBy(wildPriceUsdc);

  if (!signer) {
    return (
      <div color="textDisabled" style={{ lineHeight: "54px" }}>
        Locked
      </div>
    );
  }

  return (
    <>
      <CardValue
        value={toReadableAmount(balance.toString(), 18)}
        color="#fff"
        lineHeight="36px"
      />
      <br />
      <CardUsdValue value={usdBalance.toNumber()} />
    </>
  );
};

export default WiLDWalletBalance;
