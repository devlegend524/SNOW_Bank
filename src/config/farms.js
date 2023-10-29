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
    logoB: tokens.eth.logo,
  },
];

const farmsConfig = [
  {
    pid: 0,
    lpSymbol: tokens.wild.symbol,
    isTokenOnly: true,
    lpAddresses: addresses.wild,
    token: tokens.wild,
    quoteToken: tokens.wild,
    logoA: "/images/tokens/wildx.svg",
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: "WETH-WILDX",
    lpAddresses: addresses.wildWethlp,
    isTokenOnly: false,
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/wildx.svg",
    logoB: "/images/tokens/weth.svg",
  },
  {
    pid: 2,
    lpSymbol: "WETH-USDC",
    lpAddresses: addresses.usdcLp,
    isTokenOnly: false,
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/weth.svg",
    logoB: "/images/tokens/usdc.svg",
  },
];

export default farmsConfig;
