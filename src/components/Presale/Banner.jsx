import { DOCS_URL } from "config";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Banner() {
  return (
    <div className="w-full rounded-md sm:mt-16 mt-3  p-3 grid grid-cols-12 snow_effect snows">
      <img
        src="/assets/stickers/snow1.webp"
        alt=""
        className="sm:col-span-4 md:col-span-3 col-span-12 max-w-[270px] w-full mx-auto my-auto"
      />
      <div className="sm:col-span-8 md:col-span-9 col-span-12">
        <p className="lg:text-6xl lg:text-left font-semibold mt-2 text-center text-4xl">
          SNOW BASE
        </p>
        <p className="text-center sm:text-left mt-7">
          An iconic yield farm launching on the BASE blockchain Saturday,
          December 2nd at 3pm EST. Presale is $12 and launch is $12. Buy BWiLD
          now and lock in your low price. Equipped with an advanced economic
          model allowing us to pay the highest yields imaginable while
          maintaining our record breaking price and liquidity growth.
        </p>
        <a className="main_btn mt-7 flex gap-3 w-fit mx-auto sm:mx-0" href={DOCS_URL} target="_blank">Read More <FaArrowRight className="my-auto"/></a>
      </div>
    </div>
  );
}
