// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import { IBouy } from "../types";

// getting all posts
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);
  const orgId = req.params.orgId;
  console.log(req.params)
  //todo: validate access tor org
  let buoys = readFileSync(join(__dirname, "../mock/buoys.json"));
  const allBuoy: IBouy[] = JSON.parse(buoys);

  try {
    //todo: this filter should be a query at cosmos but using this for mock data
    res.status(200).json(allBuoy.filter((bouy) => { return bouy.owner_org == orgId }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getOne = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);
  console.log(req.params)
  const orgId = req.params.orgId;
  const bouyId = req.params.id;
  let buoys = readFileSync(join(__dirname, "../mock/buoys.json"));
  const allBuoys: IBouy[] = JSON.parse(buoys);

  try {
    res.status(200).json(allBuoys.find((bouy) => { return bouy.id == bouyId }));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export default { getAll, getOne };
