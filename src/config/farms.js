import tokens from "./tokens";
import addresses from "constants/addresses";

export const liquidityList = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.wild.address,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: "",
  },
  {
    pid: 0,
    lpSymbol: tokens.eth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.eth.address,
    decimals: 18,
    logoA: tokens.eth.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.wbnb.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.wbnb.address,
    decimals: 18,
    logoA: tokens.wbnb.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: "WBNB-3WiLD",
    isTokenOnly: false,
    lpAddresses: addresses.wildWbnblp,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: tokens.wbnb.logo,
  },
];

export const zapList = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.wild.address,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: "",
  },
  {
    pid: 0,
    lpSymbol: tokens.eth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.eth.address,
    decimals: 18,
    logoA: tokens.eth.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.wbnb.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.wbnb.address,
    decimals: 18,
    logoA: tokens.wbnb.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.usdc.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.usdc.address,
    decimals: 6,
    logoA: tokens.usdc.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: "WBNB-3WiLD",
    isTokenOnly: false,
    lpAddresses: addresses.wildWbnblp,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: tokens.wbnb.logo,
  },
];

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: "WBNB-3WiLD",
    lpAddresses: addresses.wildWbnblp,
    isTokenOnly: false,
    isNFTPool: false,
    token: tokens.wild,
    quoteToken: tokens.wbnb,
    logoA: tokens.wild.logo,
    logoB: tokens.wbnb.logo,
  },
  {
    pid: 1,
    lpSymbol: "WBNB-USDC",
    lpAddresses: addresses.usdcLp,
    isTokenOnly: false,
    isNFTPool: false,
    token: tokens.usdc,
    quoteToken: tokens.wbnb,
    logoA: tokens.wbnb.logo,
    logoB: tokens.usdc.logo,
  },
  {
    pid: 2,
    lpSymbol: "3WiLDNFT",
    lpAddresses: addresses.nft,
    isTokenOnly: true,
    isNFTPool: true,
    token: tokens.nft,
    quoteToken: tokens.wild,
    logoA: "/images/tokens/link.svg",
    logoB: "",
  },
];

export default farmsConfig;
