import React from "react";
import { notify } from "utils/toastHelper";
import moment from "moment";
export default function ClaimComponent({
  finished,
  claimWILD,
  claimable,
  userDeposited,
}) {
  const lastClaimedTime = window.localStorage.getItem("lastClaimedTime");
  const handleClaim = () => {
    if (!finished) {
      notify("error", "Presale is not ended yet");
      return;
    }
    if (Number(userDeposited) === 0) {
      notify("error", "You do not have any tokens to claim");
      return;
    }
    claimWILD();
  };
  return (
    <div className="claim_card">
      <div className="py-8">
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
          <div> Total Earned BWiLD:</div>
          <div>{claimable} BWiLD</div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
          <div> Total Claimed BWiLD:</div>
          <div>{claimable} BWiLD</div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
          <div> Next Claimable BWiLD:</div>
          <div>{claimable} BWiLD</div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
          <div> Last Claimed Time:</div>
          <div>
            {lastClaimedTime
              ? moment(Number(lastClaimedTime)).format("YYYY-MM-DD HH:mm:ss")
              : "0000-00-00 00:00:00"}{" "}
          </div>
        </div>
        <div className="flex justify-between mb-3 border-b border-symbolBorder px-1 text-sm">
          <div> Next Claimable Time:</div>
          <div>
            {lastClaimedTime
              ? moment(Number(lastClaimedTime))
                  .add(1, "h")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "0000-00-00 00:00:00"}
          </div>
        </div>
      </div>

      <button
        className="main_btn w-full py-[2px!important]"
        onClick={() => handleClaim()}
        disabled={!finished ? "disabled" : ""}
      >
        {!finished
          ? "Preslae is not ended yet"
          : Number(claimable) === 0
          ? "You don't have any tokens to claim"
          : "ClAIM WILD"}
      </button>
    </div>
  );
}
