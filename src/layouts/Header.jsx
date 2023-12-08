import React, { useEffect, useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { routes } from "config";
import { WalletConnect } from "components/UI/ConnectButton";

export default function Header() {
  const currentUrl = window.location.pathname;
  const [isMobile, setMobile] = useState(false);
  const [scrollHeader, setScrollHeader] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrollHeader(true);
      } else {
        setScrollHeader(false);
      }
    });
  }, []);

  return (
    <div
      className={`w-full  fixed left-1/2 -translate-x-1/2 px-3 z-50 duration-300 ${
        scrollHeader ? "bg-secondary top-0 py-2" : "top-2 py-3"
      }`}
    >
      <div className="container mx-auto relative">
        <div className="flex justify-between">
          <div className="logo relative items-center flex">
            <a href="/" className="absolute -top-1 left-0 h-[65px] w-[72px] hidden sm:inline-block">
              <img src="/logo.webp" className="h-[70px] w-[75px] mt-1" alt="" />
            </a>
            <div
              className="text-white ml-2 block sm:hidden my-auto"
              onClick={() => setMobile(!isMobile)}
            >
              <Hamburger />
            </div>
          </div>
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="nav_list">
              {routes.map((link, key) => (
                <li
                  className={`list_item text-white ${
                    currentUrl === link.url ? "active" : ""
                  }`}
                  key={key}
                >
                  <a href={link.url}>{link.name}</a>
                  <div className="flex gap-[2px]">
                    <div className="h-1 w-full bg-white"></div>
                  </div>
                </li>
              ))}
              {/* <li className="list_item">
                <a
                  href="https://lodgedocs.gitbook.io/snowbase-farm/protocol/about-snow"
                  target="_blank"
                  className={`p-3`}
                  rel="noopener noreferrer"
                >
                  Docs
                </a>
                <div className="flex gap-[2px]">
                  <div className="h-1 w-full bg-white"></div>
                </div>
              </li> */}
            </ul>
          </div>
          <div className="sm:hidden"></div>
          <div className="nav_action">
            <WalletConnect />
            <div
              className="text-white ml-2 hidden sm:block lg:hidden"
              onClick={() => setMobile(!isMobile)}
            >
              <Hamburger />
            </div>
          </div>
        </div>
      </div>
      {isMobile === true ? (
        <div className="w-full bg-white/5 backdrop-blur-2xl mt-2 rounded-md shadow shadow-black mr-auto ml-auto">
          <div className="nav_bar mobile_navbar">
            <ul className="nav_list">
              {routes.map((link, key) => (
                <li
                  className={`list_item cursor-pointer ${
                    currentUrl === link.url ? "active" : ""
                  }`}
                  key={key}
                >
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
              <li className={`list_item cursor-pointer`}>
                <a
                  href="https://lodgedocs.gitbook.io/snowbase-farm/protocol/about-snow"
                  target="_blank"
                  className={`p-3`}
                  rel="noopener noreferrer"
                >
                  {" "}
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
