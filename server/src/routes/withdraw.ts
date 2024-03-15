import { Router } from "express";
import { besuProvider, contract } from "../index";
import { ContractTransactionResponse } from "ethers";

const withdraw = Router();

withdraw.post('/', async (req, res, next) => {
  console.log('POST /withdraw')

  const contractBalance =  (await besuProvider.getBalance(await contract.getAddress())).toString()
  console.log(contractBalance)
  
  const txResponse = await contract.withdraw({gasLimit: 100_000}) as ContractTransactionResponse;
  const txReceipt = await txResponse.wait();

  const response = {
    "transactionHash": txReceipt?.hash,
    "valueReceived": contractBalance,
    "status": txReceipt?.status == 1 ? "successed" : "failed"
  }
  res.status(200).json(response)
})

export default withdraw;