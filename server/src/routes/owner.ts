import { Router } from "express";
import { contract } from "../index";

const owner = Router();

owner.get('/', async (req, res, next) => {
  console.log('GET /owner')

  // const ownerFn = contract.getFunction("owner");
  // const owner = (await ownerFn.staticCallResult())
  const owner = await contract.owner();
  const response = {
    owner
  }
  res.status(200).json(response)
})

export default owner;