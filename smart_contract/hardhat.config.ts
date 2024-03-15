import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks:{
    besu:{
      url: process.env.HTTP_RPC_URL + ":" + process.env.BESU_PORT,
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;
