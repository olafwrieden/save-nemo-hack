// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";

// getting all posts
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  let buoys = readFileSync(join(__dirname, "../mock/buoys.json"));
  const allBuoys = JSON.parse(buoys);

  try {
    res.status(200).json(allBuoys);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getAll };
