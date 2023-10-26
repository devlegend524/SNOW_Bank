import React, { useState } from "react";

import AddLiquidity from "components/AddLiquidity";
import SupplyLiquidity from "components/SupplyLiquidity";

export default function Liquidity() {
  const [supLiquidity, setAddLiquidity] = useState(false);
  const [tokenA, setTokenA] = useState();
  const [tokenB, setTokenB] = useState();

  const handleSupply = (val) => {
    setAddLiquidity(val);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      {supLiquidity === true ? (
        <SupplyLiquidity
          handleSupply={handleSupply}
          tokenA={tokenA}
          tokenB={tokenB}
        />
      ) : (
        <AddLiquidity
          handleSupply={handleSupply}
          setTokenA={setTokenA}
          setTokenB={setTokenB}
        />
      )}
    </div>
  );
}
