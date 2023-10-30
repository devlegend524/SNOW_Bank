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
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.weth.address,
    decimals: 18,
    logoA: tokens.weth.logo,
    logoB: "",
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
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: tokens.weth.address,
    decimals: 18,
    logoA: tokens.weth.logo,
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: "WETH-WILDX",
    isTokenOnly: false,
    lpAddresses: addresses.wildWethlp,
    decimals: 18,
    logoA: tokens.wild.logo,
    logoB: tokens.weth.logo,
  },
];

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: "WETH-WILDX",
    lpAddresses: addresses.wildWethlp,
    isTokenOnly: false,
    isNFTPool: false,
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: tokens.wild.logo,
    logoB: tokens.weth.logo,
  },
  {
    pid: 2,
    lpSymbol: "WETH-USDC",
    lpAddresses: addresses.usdcLp,
    isTokenOnly: false,
    isNFTPool: false,
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: tokens.weth.logo,
    logoB: tokens.usdc.logo,
  },
  {
    pid: 1,
    lpSymbol: "WILDx NFT",
    lpAddresses: addresses.nft,
    isTokenOnly: true,
    isNFTPool: true,
    token: tokens.nft,
    quoteToken: tokens.nft,
    logoA: "/images/tokens/link.svg",
    logoB: "",
  },
];

export default farmsConfig;
