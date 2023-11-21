import React, { useEffect, useState } from "react";
import { getXXWiLDContract } from "utils/contractHelpers";
import { useEthersProvider } from "hooks/useEthers";

export default function CurrentSaleTax() {
  const [taxRate, setTaxRate] = useState(0);
  const provider = useEthersProvider();
  const getCurrentTaxRate = async () => {
    try {
      const pWildContract = getXXWiLDContract(provider);
      const currentRate = await pWildContract.getCurrentTaxRate();
      setTaxRate(Number(currentRate) / 100);
    } catch (e) {
      console.log(e);
      setTaxRate(6);
    }
  };
  useEffect(() => {
    if (provider) getCurrentTaxRate();
  }, [provider]);
  return (
    <div className="text-[40px] font-semibold text-white">
      {Number(taxRate).toFixed(2)} %
    </div>
  );
}
