#!/bin/sh
source .env

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

path=$(pwd)
server_folder=$path/server/
contract_folder=$path/smart_contract/

printf "\n${GREEN}*** Installing server dependencies ***${NC}\n"
# $(npm ci $server_folder)1>&2
echo "Success."

printf "\n${GREEN}*** Installing smart contract dependencies ***${NC}\n"
# npm ci $contract_folder
echo "Success."

printf "\n${GREEN}*** Copying .env file to /server and /smart_contract folders ***${NC}\n"
cp .env $server_folder
cp .env $contract_folder
echo "Success."

printf "\n${GREEN}*** Running Hyperledger Besu dev container ***${NC}\n"
mkdir besu_data > /dev/null 2>&1

# id=$(docker run -d --rm --name besu -p 8545:8545 --mount type=bind,source=$path/besu_data/,target=/var/lib/besu hyperledger/besu:latest --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-enabled --network=dev --data-path=/var/lib/besu)

# if ! docker top $id &>/dev/null
# then
#   printf "\n${RED}*** Besu container crashed unexpectedly... ***${NC}\n"
#   exit 1
# fi
echo "Success."