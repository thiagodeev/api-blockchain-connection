import { ethers as hrEthers } from "hardhat";
import { ethers } from "ethers";

async function main() {
  const JAN_1ST_2030 = 1893456000;
  const ONE_GWEI: bigint = 1_000_000_000n;

  const [ signer ] = await hrEthers.getSigners();
  console.log("Deploying contracts with the account:", signer.address);

  const contract: ethers.ContractFactory = await hrEthers.getContractFactory("Lock");

  const deployedContract = await contract.deploy(JAN_1ST_2030, {value: ONE_GWEI});
  deployedContract.waitForDeployment();

  console.log("Token address:", await deployedContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
