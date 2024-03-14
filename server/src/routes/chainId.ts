import { Router } from "express";

let chainId = Router();

chainId.get('/', async (req, res, next) => {
  const response = "Hello World!"
  console.log('First log of the operation.')
  res.status(200).json(response)
})

export default chainId;