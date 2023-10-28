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
    lpSymbol: "WETH-WILDX",
    lpAddresses: "0x092b4Fb175D84A234e6451cde3953f9907Ec2589",
    isTokenOnly: false,
    token: tokens.wild,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/wildx.svg",
    logoB: "/images/tokens/weth.svg",
  },
  {
    pid: 2,
    lpSymbol: "WETH-USDC",
    lpAddresses: "0xd99c7F6C65857AC913a8f880A4cb84032AB2FC5b", //"0x61D62650278b87F64305e07fCbaeB53c7C0f4f6C",
    isTokenOnly: false,
    token: tokens.usdc,
    quoteToken: tokens.weth,
    logoA: "/images/tokens/weth.svg",
    logoB: "/images/tokens/usdc.svg",
  },
];

export default farmsConfig;
