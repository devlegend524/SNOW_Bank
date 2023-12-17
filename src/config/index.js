import { BIG_TEN } from "utils/bigNumber";
import BigNumber from "bignumber.js";
import { IoBook } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export const BASE_URL = "https://snowbank.farm";
export const ALCHEMY_ID = "86wTK178jC4XNO9sh-iVI7P5fV1tg_Dx";

export const CHAIN_ID = 369;
export const TESTNET_CHAIN_ID = 5;

export const DEFAULT_GAS_LIMIT = 2000000;
export const DEFAULT_GAS_PRICE = 2;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const NUMBER_OF_FARMS_VISIBLE = 12;
export const snowWethFarmPid = 0;
export const wethUsdcFarmPid = 1;
export const YEAR = 60 * 60 * 24 * 365;
export const YEAR_BN = new BigNumber(YEAR);

export const SALE_PRICE = 50;
export const LAUNCH_PRICE = 60;
export const MAX_PER_USER = 300;
export const HARD_CAP = 50;
export const SOFT_CAP = 10;
// export const MAX_PER_USER = 300;

export const mainTokenSymbol = "SNOW";
export const DOCS_URL =
  "https://snowbank.gitbook.io/snow-bank";

export const BASE_EXCHANGE_URL_BY_CHAIN = {
  369: "https://app.uniswap.org",
};

export const BASE_EXCHANGE_URL = BASE_EXCHANGE_URL_BY_CHAIN[CHAIN_ID];

export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/liquidity`;
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/swap`;
export const ARCHIVED_NODE = "https://developer-access-mainnet.base.org";

// export const YEAR = 60 * 60 * 24 * 365
// export const YEAR_BN = new BigNumber(YEAR)

export const privateSNOWPrice = 12;
export const BASE_EXPLORER = "https://etherscan.io/";

export const socials = [
  {
    icon: () => <IoBook />,
    name: "",
    href: "https://snowbank.gitbook.io/snow-bank",
  },
  {
    icon: () => <FaDiscord />,
    name: "",
    href: "https://discord.gg/KUwRXGdp",
  },
  // {
  //   icon: () => <FaYoutube />,
  //   name: "",
  //   href: "https://youtube.com/@lodgecapital",
  // },
  {
    icon: () => <FaTwitter />,
    name: "",
    href: "https://x.com/snowbanketh",
  },
  {
    icon: () => <FaTelegramPlane />,
    name: "",
    href: " https://t.me/snowbanketh",
  },
];

export const routes = [
  // {
    // name: "Farm",
    // url: "/",
  // },
  // {
  //   name: "Swap",
  //   url: "/swap",
  // },
  // {
  //   name: "Liquidity",
  //   url: "/liquidity",
  // },
  // {
  //   name: "NFT Claim",
  //   url: "/nft-claim",
  // },
  {
    name: "Snow Sale",
    url: "/",
  },
  {
    name: "NFT Sale",
    url: "/nft-sale",
  },
  {
    name: "Road Map",
    url: "/roadmap",
  },
];
