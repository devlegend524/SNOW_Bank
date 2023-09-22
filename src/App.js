/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import "App.css";
import { RouterProvider } from "react-router-dom";
import PageRouter from "router";
import Layouts from "layouts";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ALCHEMY_ID } from "config";
import ContractContextProvideer from "context/contracts";
import { Toaster } from 'react-hot-toast';

function App() {
  const { chains, publicClient } = configureChains(
    [bsc, bscTestnet],
    [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "wildbase.fram",
    projectId: "85ea32d265dfc865d0672c8b6b5c53d2",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ContractContextProvideer>
          <Layouts>
            <RouterProvider router={PageRouter} />
          </Layouts>
          <Toaster  position="bottom-right" />
        </ContractContextProvideer>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
