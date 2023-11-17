import BigNumber from "bignumber.js";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Modal, Text } from "uikit";
import ModalActions from "./ModalActions";
import ModalInput from "./ModalInput";
import { useTranslation } from "context/Localization";
import { getFullDisplayBalance } from "utils/formatBalance";

const WithdrawModal = ({
  isNFTPool,
  isNFTALL,
  setIsNFTALL,
  onConfirm,
  onDismiss,
  max,
  tokenName = "",
}) => {
  const [val, setVal] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const { t } = useTranslation();
  const fullBalance = useMemo(() => {
    return isNFTPool ? new BigNumber(max) : getFullDisplayBalance(max);
  }, [max]);

  const valNumber = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  const handleChange = useCallback(
    (e) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, "."));
      }
    },
    [setVal]
  );
  console.log(val)

  const handleSelectMax = useCallback(() => {
    if (isNFTPool) {
      console.log('setting max for nft')
      setIsNFTALL(true);
      setVal(fullBalance);
    } else {
      setVal(fullBalance);
    }
  }, [fullBalance, isNFTPool, setIsNFTALL, setVal]);

  const submitDisabled =
    pendingTx ||
    !valNumber.isFinite() ||
    (!isNFTPool && valNumber.eq(0)) ||
    (!isNFTPool && valNumber.gt(fullBalanceNumber));

  return (
    <Modal title={t("Unstake tokens")} onDismiss={onDismiss}>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        isNFTPool={isNFTPool}
        symbol={tokenName}
        inputTitle={t("Unstake")}
      />
      <ModalActions>
        <Button
          variant="secondary"
          onClick={onDismiss}
          width="100%"
          disabled={pendingTx}
        >
          {t("Cancel")}
        </Button>
        <Button
          className="pulse_bg text-[white!important]"
          disabled={submitDisabled}
          onClick={async () => {
            setPendingTx(true);
            await onConfirm(val);
            setPendingTx(false);
            onDismiss();
          }}
          width="100%"
          style={{ alignSelf: "center", color: "black" }}
        >
          {pendingTx ? t("Pending Confirmation") : t("Confirm")}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default WithdrawModal;
