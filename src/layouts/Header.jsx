import React, { useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { routes } from "config";
import { WalletConnect } from "components/UI/ConnectButton";

export default function Header() {
  const currentUrl = window.location.pathname;
  const [isMobile, setMobile] = useState(false);

  return (
    <>
      <div className="bg-secondary">
        <div className="container mr-auto ml-auto relative">
          <div className="flex justify-between">
            <div className="hidden sm:block logo">
              <a href="/">
                <span className="text-orange">3</span>WiLD
              </a>
            </div>
            <div
              className="text-orange ml-2 block sm:hidden mt-[3px]"
              onClick={() => setMobile(!isMobile)}
            >
              <Hamburger />
            </div>

            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ul className="nav_list">
                {routes.map((link, key) => (
                  <li
                    className={`list_item ${
                      currentUrl === link.url ? "active" : ""
                    }`}
                    key={key}
                  >
                    <a href={link.url}>{link.name}</a>
                    <div className="flex gap-[2px]">
                      <div className="h-1 w-full bg-orange"></div>
                      <div className="w-1 h-1 bg-orange rounded-full"></div>
                    </div>
                  </li>
                ))}
                <li
                  className="list_item"
                >
                  <a
                    href="https://lodgedocs.gitbook.io/3WiLD-bsc-farm/"
                    target="_blank"
                    className={`p-3`}
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>
                  <div className="flex gap-[2px]">
                    <div className="h-1 w-full bg-orange"></div>
                    <div className="w-1 h-1 bg-orange rounded-full"></div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="nav_action">
              <WalletConnect />
              <div
                className="text-orange ml-2 hidden sm:block lg:hidden"
                onClick={() => setMobile(!isMobile)}
              >
                <Hamburger />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobile === true ? (
        <div className="container mr-auto ml-auto">
          <div className="nav_bar mobile_navbar">
            <ul className="nav_list">
              {routes.map((link, key) => (
                <li
                  className={`list_item ${
                    currentUrl === link.url ? "active" : ""
                  }`}
                  key={key}
                >
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
              <li className={`list_item`}>
                <a
                  href="https://lodgedocs.gitbook.io/3WiLD-bsc-farm/"
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
    </>
  );
}
