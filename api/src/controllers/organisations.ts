// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";

// getting all posts
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  let organisations = readFileSync(join(__dirname, "../mock/organisations.json"));
  const allOrgs = JSON.parse(organisations);

  try {
    res.status(200).json(allOrgs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getAll };
