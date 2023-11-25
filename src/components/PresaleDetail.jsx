import React, { useEffect, useState } from "react";
import { formatAddress } from "utils/customHelpers";
import { getPresaleAddress } from "utils/addressHelpers";
import { BASE_EXPLORER } from "config";
import {
  minPrivatePurchase,
  minPublicPurchase,
  maxPrivatePurchase,
  maxPublicPurchase,
  privateWILDPrice,
  publicWILDPrice,
} from "config";

export default function PresaleDetail({
  totalRaised,
  isPrivateParticipant,
  userDeposited,
}) {
  return (
    <div className="">
      <div className="flex justify-between gap-3">
        <div className="annual_price">
          <p>Your Commited</p>
          <h3>{userDeposited} ETH</h3>
        </div>
        <div className="annual_price">
          <p>Total Raised</p>
          <h3>{totalRaised} ETH</h3>
        </div>
      </div>

      <div className="main_detail">
        <div className="detail_title">Main Details</div>
        <div className="detail_list">
          <div className="list_item">
            <p>Token Sale Contract</p>
            <p>
              <a
                href={`${BASE_EXPLORER}/address/${getPresaleAddress()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatAddress(getPresaleAddress(), 4)}
              </a>
            </p>
          </div>
          <div className="list_item">
            <p>Price Per WILD</p>
            <p className="flex gap-1">
              <span
                className={
                  isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                ${privateWILDPrice}
              </span>
              /
              <span
                className={
                  !isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                ${publicWILDPrice}
              </span>
            </p>
          </div>
          <div className="list_item">
            <p>Minimum Purchase:</p>
            <p className="flex gap-1">
              <span
                className={
                  isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                {" "}
                {minPrivatePurchase} ETH
              </span>
              /
              <span
                className={
                  !isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                {minPublicPurchase} ETH
              </span>
            </p>
          </div>
          <div className="list_item">
            <p>Maximum Purchase: </p>
            <p className="flex gap-1">
              <span
                className={
                  isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                {maxPrivatePurchase} ETH
              </span>
              /
              <span
                className={
                  !isPrivateParticipant ? "font-semibold text-green-500" : ""
                }
              >
                {maxPublicPurchase} ETH
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
