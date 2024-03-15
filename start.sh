#!/bin/bash
source .env

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

exitfn () {
  trap SIGINT            # Restore signal handling for SIGINT.
  echo " "
  echo "Stoping..."
  docker remove besu -f > /dev/null 2>&1
  exit                   #   then exit script.
}
exitAfterDockerFn () {
  trap SIGINT            # Restore signal handling for SIGINT.
  printf "\n${GREEN}*** Removing Hyperledger Besu dev container... ***${NC}\n"
  docker remove besu -f > /dev/null 2>&1
  echo "Success."
  exit                #   then exit script.
}

trap "exitfn" INT  

path=$(pwd)
server_folder=$path/server/
contract_folder=$path/smart_contract/

printf "\n${GREEN}*** Installing server dependencies... ***${NC}\n"
# $(npm ci $server_folder) > /dev/null 2>&1
echo "Success."

printf "\n${GREEN}*** Installing smart contract dependencies... ***${NC}\n"
# $(npm ci $contract_folder) > /dev/null 2>&1
echo "Success."

printf "\n${GREEN}*** Copying .env file to /server and /smart_contract folders... ***${NC}\n"
cp .env $server_folder
cp .env $contract_folder
echo "Success."

printf "\n${GREEN}*** Running Hyperledger Besu dev container... ***${NC}\n"

id=$(docker run -d --rm --name besu -p 8545:$BESU_PORT hyperledger/besu:latest --miner-enabled --miner-coinbase 976EA74026E726554dB657fA54763abd0C3a0aa9 --rpc-http-enabled --network=dev)

trap "exitAfterDockerFn" INT 

if ! docker top $id &>/dev/null
then
  printf "\n${RED}*** Besu container crashed unexpectedly... ***${NC}\n"
  exit 1
fi
sleep 5
echo "Success."

printf "\n${GREEN}*** Compiling and deploying the smart contract... ***${NC}\n"
cd $contract_folder
npx hardhat run --network besu scripts/deploy.ts
echo "Success."

printf "\n${GREEN}*** Starting API server... ***${NC}\n"
cd $server_folder
npm run buildAndStart


trap SIGINT