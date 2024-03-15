import { Router } from "express";
import { contract, signer } from "../index";
import { TransactionRequest } from "ethers";

const sendEther = Router();

sendEther.post('/', async (req, res, next) => {
  console.log('PUT /sendEther')

  const value = req.body.value as bigint;
  const contractMethod = contract.getFunction("sendEther")
  const txResponse = await contractMethod.send({value})
  const txReceipt = await txResponse.wait();
  
  const response = {
    "transactionHash": txReceipt?.hash,
    "valueSent": txResponse.value.toString(),
    "status": txReceipt?.status == 1 ? "successed" : "failed"
  }
  res.status(200).json(response)
})

export default sendEther;