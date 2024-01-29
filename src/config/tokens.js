import addresses from "constants/addresses";

const tokens = {
  bnb: {
    symbol: "BNB",
    address: addresses.wbnb,
    decimals: 18,
    logo: "/assets/tokens/bnb.png",
  },
  snow: {
    symbol: "SNOW",
    address: addresses.snow,
    decimals: 18,
    logo: "/assets/tokens/snow.png",
    projectLink: "https://snowbank.io/", // todo:
  },
  wbnb: {
    symbol: "WBNB",
    logo: "/assets/tokens/bnb.png",
    address: addresses.wbnb,
    decimals: 18,
  },
  usdc: {
    symbol: "USDC",
    address: addresses.usdc,
    decimals: 6,
    logo: "/assets/tokens/usdc.svg",
  },
  dai: {
    symbol: "DAI",
    address: addresses.dai,
    decimals: 18,
    logo: "/assets/tokens/dai.svg",
  },
  mim: {
    symbol: "MIM",
    address: addresses.mim,
    decimals: 18,
    logo: "/assets/tokens/mim.svg",
  },
  nft: {
    symbol: "SNOW NFT",
    address: addresses.nft,
    decimals: 18,
    logo: "/assets/tokens/nft.png",
  },
};

export default tokens;
