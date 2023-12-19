import addresses from "constants/addresses";

const tokens = {
  eth: {
    symbol: "ETH",
    address: addresses.weth,
    decimals: 18,
    logo: "/assets/tokens/eth.svg",
  },
  snow: {
    symbol: "SNOW",
    address: addresses.snow,
    decimals: 18,
    logo: "/assets/tokens/snow.png",
    projectLink: "https://snowbank.farm/", // todo:
  },
  weth: {
    symbol: "WETH",
    logo: "/assets/tokens/weth.png",
    address: addresses.weth,
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
