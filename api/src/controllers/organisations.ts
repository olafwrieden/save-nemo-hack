// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import getConnection from "../common/database";

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

const getOwn = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  // Run Query to get user's roles
  const { resources: items } = await container.items
    .query(
      `SELECT o FROM organizations o JOIN users IN o.members WHERE users.user = '${req.authInfo["oid"]}'`
    )
    .fetchAll();

  try {
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);
  const orgId = req.params.orgId;
  // Run Query to get user's roles
  const { resources: items } = await container.items
    .query(
      `SELECT o FROM organzations o JOIN users IN o.members WHERE users.user = '${req.authInfo.oid}' and o.id = '${orgId}'`
    )
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
    description: req.body.description,
    plan: "STARTER",
    isEnabled: true,
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

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  const orgId = req.params.orgId;

  const newOrg = {
    id: orgId,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
  };

  // const { resource: org } = await container.item(orgId, "Jane's Diving School").read();
  // console.log(org);
  // const { id, name } = org;

  // const { resource: updatedItem } = await container
  //   .item(id, "Jane's Diving School")
  //   .replace(newOrg);

  try {
    res.status(501).json({ error: "Endpoint is not Implemented Yet" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getAll, create, getOwn, getOne, updateOne };
