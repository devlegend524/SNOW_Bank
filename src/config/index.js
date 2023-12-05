import { BIG_TEN } from "utils/bigNumber";
import BigNumber from "bignumber.js";
import { IoBook } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export const BASE_URL = "https://wildbase.farm";
export const ALCHEMY_ID = "86wTK178jC4XNO9sh-iVI7P5fV1tg_Dx";

export const CHAIN_ID = 8453;
export const TESTNET_CHAIN_ID = 84531;

export const DEFAULT_GAS_LIMIT = 2000000;
export const DEFAULT_GAS_PRICE = 2;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const NUMBER_OF_FARMS_VISIBLE = 12;
export const wildWethFarmPid = 0;
export const wethUsdcFarmPid = 1;
export const YEAR = 60 * 60 * 24 * 365;
export const YEAR_BN = new BigNumber(YEAR);

export const SALE_PRICE = 16;
export const LAUNCH_PRICE = 12;
export const MAX_PER_USER = 300;
export const HARD_CAP = 50;
export const SOFT_CAP = 10;
// export const MAX_PER_USER = 300;

export const mainTokenSymbol = "BWiLD";
export const DOCS_URL =
  "https://lodgedocs.gitbook.io/wildbase-farm/protocol/about-bwild";

export const BASE_EXCHANGE_URL_BY_CHAIN = {
  8453: "https://www.dackieswap.xyz",
};

export const BASE_EXCHANGE_URL = BASE_EXCHANGE_URL_BY_CHAIN[CHAIN_ID];

export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/liquidity`;
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/swap`;
export const ARCHIVED_NODE = "https://developer-access-mainnet.base.org";

// export const YEAR = 60 * 60 * 24 * 365
// export const YEAR_BN = new BigNumber(YEAR)

export const privateWILDPrice = 12;
export const BASE_EXPLORER = "https://basescan.org/";

export const socials = [
  {
    icon: () => <IoBook />,
    name: "",
    href: "https://lodgedocs.gitbook.io/wildbase-farm/protocol/about-bwild",
  },
  {
    icon: () => <FaDiscord />,
    name: "",
    href: "https://discord.gg/c6Tq9GqV",
  },
  {
    icon: () => <FaYoutube />,
    name: "",
    href: "https://youtube.com/@lodgecapital",
  },
  {
    icon: () => <FaTwitter />,
    name: "",
    href: "https://t.me/wildbasefarm",
  },
  {
    icon: () => <FaTelegramPlane />,
    name: "",
    href: " https://x.com/lodgecapital",
  },
];

export const routes = [
  {
    name: "Farm",
    url: "/",
  },
  {
    name: "Swap",
    url: "/swap",
  },
  // {
  //   name: "Liquidity",
  //   url: "/liquidity",
  // },
  // {
  //   name: "NFT Claim",
  //   url: "/nft-claim",
  // },
  {
    name: "Claim",
    url: "/presale",
  },
];
