import tokens from "./tokens";

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
    lpAddresses: "0x092b4Fb175D84A234e6451cde3953f9907Ec2589",
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
    lpAddresses: "0x58E916635A8D406B459C1c6009FC4f981E7a21a4",
    token: tokens.wild,
    quoteToken: tokens.wild,
    logoA: "/images/tokens/wildx.svg",
    logoB: "",
  },
  {
    pid: 1,
    lpSymbol: tokens.weth.symbol,
    isTokenOnly: true,
    lpAddresses: "0x4200000000000000000000000000000000000006",
    token: tokens.weth,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/weth.svg",
    logoB: "",
  },
  {
    pid: 2,
    lpSymbol: "WETH-WILDX",
    lpAddresses: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/wildx.svg",
    logoB: "/images/tokens/weth.svg",
  },
  {
    pid: 3,
    lpSymbol: "WETH-USDC",
    lpAddresses: "0xd99c7F6C65857AC913a8f880A4cb84032AB2FC5b",
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/weth.svg",
    logoB: "/images/tokens/usdc.svg",
  },
];

export default farmsConfig;
