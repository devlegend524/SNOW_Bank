import { DOCS_URL } from "config";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function NFTBanner() {
  return (
    <div className="w-full rounded-md sm:mt-16 mt-3 px-3 grid grid-cols-12 snow_effect snows py-4 gap-3">
      <img
        src="/assets/stickers/sticker3.webp"
        alt=""
        className="sm:col-span-4 md:col-span-3 col-span-12 max-w-[270px] w-full mx-auto my-auto"
      />
      <div className="sm:col-span-8 md:col-span-9 col-span-12">
        <p className="lg:text-6xl sm:text-left font-semibold mt-2 text-center text-4xl">
          SNOW BANK
        </p>
        <p className="text-center sm:text-left mt-7">
          Snow Bank introduces an exclusive range of SNOW NFTs, a unique
          collection that offers more than just aesthetic appeal. These NFTs are
          available for purchase at 0.05 ETH each and play a pivotal role in the
          Snow Bank ecosystem.
        </p>
        <a
          className="main_btn mt-7 flex gap-3 w-fit mx-auto sm:mx-0"
          href={DOCS_URL + "/snow-nfts"}
          target="_blank"
        >
          Read Docs <FaArrowRight className="my-auto" />
        </a>
      </div>
    </div>
  );
}
