import { HARD_CAP } from "config";
import { mainTokenSymbol } from "config";
import { SOFT_CAP } from "config";
import { LAUNCH_PRICE } from "config";
import { SALE_PRICE } from "config";
import { BASE_EXPLORER } from "config";
import React from "react";
import { getPresaleAddress } from "utils/addressHelpers";
import { formatAddress } from "utils/customHelpers";

export default function PresaleDetails({ saleData }) {
  return (
    <div className="col-span-12 sm:col-span-6">
      <div className="w-full rounded-md p-4 snow_effect">
        <div className="balance_form">
          <div className="my-8">
            <div className="flex justify-between mb-4 px-1">
              <div> Total Raised:</div>
              <div>{saleData?.saleData || "0.00"} ETH</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Your Committed:</div>
              <div>{saleData?.user_deposits || "0.00"} ETH</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Your {mainTokenSymbol} Owned:</div>
              <div>
                {saleData?.WILDOwned || "0.00"} {mainTokenSymbol}
              </div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Hadcap:</div>
              <div>{HARD_CAP} ETH</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> SoftCap:</div>
              <div>{SOFT_CAP} ETH</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Presale Price:</div>
              <div>${SALE_PRICE}</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Launch Price:</div>
              <div>${LAUNCH_PRICE}</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Vesting Period:</div>
              <div>20 days</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Vesting Percent:</div>
              <div>5% daily</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Finished Time:</div>
              <div>
                {saleData?.finishedTimestamp
                  ? new Date(saleData?.finishedTimestamp * 1000).toDateString()
                  : "0000-00-00 00:00:00"}
              </div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Launch Date:</div>
              <div>2023-12-25</div>
            </div>
            <div className="flex justify-between mb-4 px-1">
              <div> Presale End Date:</div>
              <div>2023-12-25</div>
            </div>
            <div className="flex justify-between mb-3 px-1">
              <div>Contract:</div>
              <div>
                <a
                  href={`${BASE_EXPLORER}/address/${getPresaleAddress()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatAddress(getPresaleAddress(), 4)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
