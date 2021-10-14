// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import getConnection from "../common/database";
const roles = require("../middleware/roles");

const container = getConnection().container("organizations");

// getting all orgs
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  // Run Query to get user's roles
  const { resources: items } = await container.items
    .query(`SELECT * FROM organizations`)
    .fetchAll();

  try {
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  const newOrg = {
    name: req.body.name,
    category: req.body.category,
    plan: "STARTER",
    isEnabled: false,
    members: [
      {
        user: req.authInfo["oid"],
        role: "ADMIN",
        joined: new Date().toUTCString(),
      },
    ],
  };

  const { resource: createdItem } = await container.items.create(newOrg);

  try {
    res.status(200).json(createdItem);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getAll, create };
