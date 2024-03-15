import express, { Express, Request, Response } from "express";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import "dotenv/config";
import { abi as bankAbi } from "../../smart_contract/artifacts/contracts/Bank.sol/Bank.json";

import chainId from "./routes/chainId";
import balance from "./routes/balance";
import sendEther from "./routes/sendEther";
import withdraw from "./routes/withdraw";
import owner from "./routes/owner";

const app: Express = express();
const port = process.env.SERVER_PORT;
const besuUrl = process.env.HTTP_RPC_URL + ":" + process.env.BESU_PORT;
const contractAddress = process.env.CONTRACT_ADDRES;

export const besuProvider = new JsonRpcProvider(besuUrl);
export const signer = new Wallet(process.env.PRIVATE_KEY!, besuProvider);
export const contract = new Contract(contractAddress!, bankAbi, signer);

app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h5>====================</h5><h3>Wellcome</h3><h5>====================</h5><p> Made by Thiagodeev</p>");
});

app.use('/chainId', chainId)
app.use('/balance', balance)
app.use('/sendEther', sendEther)
app.use('/withdraw', withdraw)
app.use('/owner', owner)

// docker run --rm --name besu -p 8545:8545 hyperledger/besu:latest --miner-enabled --miner-coinbase 976EA74026E726554dB657fA54763abd0C3a0aa9 --rpc-http-enabled --rpc-http-cors-origins=all --network=dev

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});