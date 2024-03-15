import { Router } from "express";
import { contract } from "../index";
import { ContractTransactionResponse } from "ethers";

const sendEther = Router();

sendEther.post('/', async (req, res, next) => {
  console.log('POST /sendEther')

  const value = req.body.value as bigint;
  const txResponse = await contract.sendEther({value}) as ContractTransactionResponse;
  const txReceipt = await txResponse.wait();
  
  const response = {
    "transactionHash": txReceipt?.hash,
    "valueSent": txResponse.value.toString(),
    "status": txReceipt?.status == 1 ? "successed" : "failed"
  }
  res.status(200).json(response)
})

export default sendEther;