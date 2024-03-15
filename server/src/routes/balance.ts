import { Router } from "express";
import { besuProvider } from "../index";

const balance = Router();

balance.get('/', async (req, res, next) => {
  console.log('GET /chainId')
  const response = {
    'chainId': (await besuProvider.getNetwork()).chainId.toString()
  }
  res.status(200).json(response)
})

export default balance;