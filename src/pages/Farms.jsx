import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import FarmBanner from "components/Farms/Banner";

export default function Farms() {
  return (
    <div className="flex justify-center max-w-screen-xl w-full">
      <div className="container m-3">
        <FarmBanner />
      </div>
    </div>
  );
}
