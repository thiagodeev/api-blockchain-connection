import { ethers as hrEthers } from "hardhat";
import { ethers } from "ethers";

async function main() {
  const ONE_GWEI: bigint = 1_000_000_000n;

  const [ signer ] = await hrEthers.getSigners();
  console.log("Deploying contracts with the account:", signer.address);

  const contract: ethers.ContractFactory = await hrEthers.getContractFactory("Bank");

  const deployedContract = await contract.deploy({value: ONE_GWEI});
  deployedContract.waitForDeployment();

  console.log("Contracts address:", await deployedContract.getAddress());
  console.log("Transaction hash:", deployedContract.deploymentTransaction()?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
