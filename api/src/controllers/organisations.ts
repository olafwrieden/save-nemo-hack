// @ts-nocheck
import { SqlQuerySpec } from "@azure/cosmos";
import { NextFunction, Request, Response } from "express";
import getConnection from "../common/database";

const container = getConnection().container("organizations");

// Get all organizations
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

/**
 * Returns all organizations of which the current user is a member.
 * @param req Express Request Object
 * @param res Express Response Object
 * @param next Express Next Middleware Function
 */
const getOwn = async (req: Request, res: Response, next: NextFunction) => {
  // Get pagination parameters from query
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 25;

  // Query Spec
  const querySpec: SqlQuerySpec = {
    query:
      "SELECT o FROM organizations o JOIN users IN o.members WHERE users.user = @userId OFFSET @offset LIMIT @limit",
    parameters: [
      {
        name: "@userId",
        value: req.authInfo["oid"],
      },
      {
        name: "@offset",
        value: offset,
      },
      {
        name: "@limit",
        value: limit,
      },
    ],
  };

  // Get Query Results
  const { resources: organizations } = await container.items
    .query(querySpec)
    .fetchAll();

  // Return Organizations
  try {
    res.status(200).json(organizations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * Returns a specific organization by id.
 * @param req Express Request Object
 * @param res Express Response Object
 * @param next Express Next Middleware Function
 */
const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const orgId = String(req.params.orgId);

  // Query Spec
  const querySpec: SqlQuerySpec = {
    query:
      "SELECT o FROM organizations o JOIN users IN o.members WHERE users.user = @userId AND o.id = @orgId",
    parameters: [
      {
        name: "@userId",
        value: req.authInfo["oid"],
      },
      {
        name: "@orgId",
        value: orgId,
      },
    ],
  };

  // Get Query Results
  const { resources: organization } = await container.items
    .query(querySpec)
    .fetchAll();

  try {
    res.status(200).json(organization);
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
        status: "JOINED",
        joined: new Date().toUTCString(),
      },
    ],
    buoys: [],
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
