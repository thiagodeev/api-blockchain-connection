import { Router } from "express";
import { besuProvider, signer, contract } from "../index";

const balance = Router();

balance.get('/', async (req, res, next) => {
  console.log('GET /balance')
  const address =  await signer.getAddress();
  const contractAddress =  await contract.getAddress();
  const response = {
    "account": {
      address,
      'balance': (await besuProvider.getBalance(address)).toString()
    },
    "contract": {
      "address": contractAddress,
      'balance': (await besuProvider.getBalance(contractAddress)).toString()
    }
  }
  res.status(200).json(response)
})

export default balance;