import express, { Express, Request, Response } from "express";
import { JsonRpcProvider, Wallet } from "ethers";
import "dotenv/config";

import chainId from "./routes/chainId";
import balance from "./routes/balance";

const app: Express = express();
const port = process.env.SERVER_PORT;
const besuUrl = process.env.HTTP_RPC_URL + ":" + process.env.BESU_PORT;

export const besuProvider = new JsonRpcProvider(besuUrl);
export const signer = new Wallet(process.env.PRIVATE_KEY!, besuProvider);

app.use(express.json())
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h5>====================</h5><h3>Wellcome</h3><h5>====================</h5><p> Made by Thiagodeev</p>");
});


app.use('/chainId', chainId)

// docker run --rm --name besu -p 8545:8545 --mount type=bind,source=/Users/thiagoribeiro/Development/personal/api-blockchain-connection/besu_data/,target=/var/lib/besu hyperledger/besu:latest --miner-enabled --miner-coinbase 976EA74026E726554dB657fA54763abd0C3a0aa9 --rpc-http-enabled --network=dev --data-path=/var/lib/besu

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});