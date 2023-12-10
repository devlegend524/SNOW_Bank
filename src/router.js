import React from "react";

import Swap from "pages/Swap";
import Liquidity from "pages/Liquidity";
import NotFound from "pages/Notfound";
import Farms from "pages/Farms";
import NFT from "pages/NftClaim";
import Presale from "pages/Presale";
import SnowPresale from "pages/SnowPresale";
import NFTPresale from "pages/NFTPresale";
import Roadmap from "pages/Roadmap";

const router = [
  {
    path: "/",
    element: <SnowPresale />,
  },
  {
    path: "/nft-sale",
    element: <NFTPresale />,
  },
  {
    path: "/roadmap",
    element: <Roadmap />,
  },
  // {
  //   path: "/farms",
  //   element: <Farms />,
  // },
  // {
  //   path: "/swap",
  //   element: <Swap />,
  // },
  // {
  //   path: "/liquidity",
  //   element: <Liquidity />,
  // },
  // {
  //   path: "/nft-claim",
  //   element: <NFT />,
  // },
  // {
  //   path: "/presale",
  //   element: <SnowPresale />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default router;
