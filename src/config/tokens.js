import addresses from "constants/addresses";

const tokens = {
  eth: {
    symbol: "BNB",
    address: addresses.wbnb,
    decimals: 18,
    logo: "/images/tokens/bnb.svg",
  },
  wild: {
    symbol: "WILDX",
    address: addresses.wild,
    decimals: 18,
    logo: "/images/tokens/wildx.svg",
    projectLink: "https://wildbase.farm/", // todo:
  },
  weth: {
    symbol: "WBNB",
    address: addresses.weth,
    decimals: 18,
    logo: "https://svgshare.com/getbyhash/sha1-38zdMb/7WVkaVJEus7guQuBuCSU=",
  },
  wbnb: {
    symbol: "WBNB",
    logo: "/images/tokens/wbnb.svg",
    address: addresses.wbnb,
    decimals: 18,
  },
  usdc: {
    symbol: "USDC",
    address: addresses.usdc,
    decimals: 18,
    logo: "/images/tokens/usdc.svg",
  },
  nft: {
    symbol: "WILDx NFT",
    address: addresses.nft,
    decimals: 18,
    logo: "/images/tokens/link.svg",
  },
};

export default tokens;
