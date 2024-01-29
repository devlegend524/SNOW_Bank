import { CHAIN_ID } from "config";
import { providers } from "ethers";
import getRpcUrl from "utils/getRpcUrl";

const RPC_URL = getRpcUrl();
const network = {
  chainId: CHAIN_ID,
  name: "bnb",
  ensAddress: undefined,
};
const httpProvider = new providers.JsonRpcProvider(RPC_URL, network);

// const RPC_URL = getRpcUrl();
// const network = {
//   chainId: 1,
//   name: "BNB Smart Chain",
//   ensAddress: undefined,
// };
// const httpProvider = new providers.JsonRpcProvider(RPC_URL, network);

export default httpProvider;
