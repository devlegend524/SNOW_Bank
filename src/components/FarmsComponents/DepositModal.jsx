import React, { useCallback, useMemo, useState } from "react";
import { Button, Modal, Skeleton } from "uikit";
import BigNumber from "bignumber.js";
import ModalActions from "./ModalActions";
import ModalInput from "./ModalInput";
import { useTranslation } from "context/Localization";
import { getFullDisplayBalance } from "utils/formatBalance";

const DepositModal = ({
  max,
  isNFTPool,
  isNFTALL,
  setIsNFTALL,
  onConfirm,
  onDismiss,
  tokenName = "",
  addLiquidityUrl,
  decimals = 18,
  depositFee,
}) => {
  const [val, setVal] = useState("");
  const [valNumber, setValueNumber] = useState(new BigNumber(0));

  const [lockPeriod, setLockPeriod] = useState(0);
  const [pendingTx, setPendingTx] = useState(false);
  const { t } = useTranslation();
  const fullBalance = useMemo(() => {
    return isNFTPool ? max : getFullDisplayBalance(max);
  }, [max]);

  const fullBalanceNumber = new BigNumber(fullBalance);

  const handleChange = useCallback(
    (e) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, "."));
      }
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    if (isNFTPool) {
      setIsNFTALL(true)
      setVal(fullBalance);
      setValueNumber(fullBalance)
    } else {
      setVal(fullBalance);
      setValueNumber(fullBalance)
    }
  }, [fullBalance, isNFTPool, setIsNFTALL, setVal]);

  return (
    <Modal title={t("Stake tokens")} onDismiss={onDismiss}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        isNFTPool={isNFTPool}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle={t("Stake")}
        decimals={decimals}
      />
      <ModalActions>
        <Button
          variant="secondary"
          onClick={onDismiss}
          width="100%"
          disabled={pendingTx}
          style={{ alignSelf: "center", color: "white" }}
        >
          {t("Cancel")}
        </Button>
        <Button
          className="pulse_bg text-white"
          width="100%"
          disabled={
            pendingTx ||
            !valNumber.isFinite() ||
            (!isNFTPool && valNumber.eq(0)) ||
            (!isNFTPool && valNumber.gt(fullBalanceNumber))
          }
          onClick={async () => {
            setPendingTx(true);
            await onConfirm(val, lockPeriod);
            setPendingTx(false);
            onDismiss();
          }}
          style={{ alignSelf: "center", color: "black" }}
        >
          {pendingTx ? t("Pending Confirmation") : t("Confirm")}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default DepositModal;
