export const BASE_URL = "localhost:3000/swap";
export const ALCHEMY_ID = "86wTK178jC4XNO9sh-iVI7P5fV1tg_Dx";
export const CHAIN_ID = 56;
export const TESTNET_CHAIN_ID = 84531;
export const BASE_EXCHANGE_URL_BY_CHAIN = {
  84531: "https://goerli.basescan.org/",
  8453: "https://pancakeswap.finance/",
};

export const BASE_EXCHANGE_URL = BASE_EXCHANGE_URL_BY_CHAIN[CHAIN_ID];
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/swap`;

export const routes = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Swap",
    url: "/swap",
  },
  {
    name: "Farm",
    url: "/farms",
  },
  {
    name: "Liquidity",
    url: "/liquidity",
  },
];
