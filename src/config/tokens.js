import addresses from "constants/addresses";

const tokens = {
  eth: {
    symbol: "PLS",
    address: addresses.wpls,
    decimals: 18,
    logo: "/assets/tokens/pls.svg",
  },
  wild: {
    symbol: "pWiLD",
    address: addresses.wild,
    decimals: 18,
    logo: "/assets/tokens/wildx.jpg",
    projectLink: "https://wildbase.farm/", // todo:
  },
  wpls: {
    symbol: "WPLS",
    logo: "/assets/tokens/wpls.svg",
    address: addresses.wpls,
    decimals: 18,
  },
  usdc: {
    symbol: "USDC",
    address: addresses.usdc,
    decimals: 18,
    logo: "/assets/tokens/usdc.svg",
  },
  dai: {
    symbol: "DAI",
    address: addresses.dai,
    decimals: 18,
    logo: "/assets/tokens/dai.svg",
  },
  usdt: {
    symbol: "USDT",
    address: addresses.usdt,
    decimals: 18,
    logo: "/assets/tokens/usdt.svg",
  },
  nft: {
    symbol: "pWiLD NFT",
    address: addresses.nft,
    decimals: 18,
    logo: "/assets/tokens/nft.png",
  },
};

export default tokens;
