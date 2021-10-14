import { NextFunction, Request, Response } from "express";
import { readFile } from "fs";
import { join } from "path";
import { OrgRole } from "../auth";
import { IOrganization } from "../types";

/**
 * TODO: Permissions Hierarchy to enforce
 *
 * ADMIN
 *  |_ CONTRIBUTOR
 *        |_ READER
 *
 */

import { roles } from "./roles";

export const grantAccess = function (action: any, resource: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers["organization_id"]) {
        return res
          .status(400)
          .send("You must supply an 'organization_id' header.");
      }

      const orgID = req.headers["organization_id"];
      const userInfo: any = req.authInfo;

      const orgsAndRoles: any = userInfo.extension_OrgRoles.split(";");
      const orgRoles = orgsAndRoles.map((attr: string) => {
        const parts = attr.split(":");
        return { name: parts[0], role: parts[1] };
      });

      const myRoleInThisOrg: string = orgRoles.find(
        (org: any) => org.name === orgID
      ).role;

      const permission: any = roles.can(myRoleInThisOrg)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const permission = (role?: OrgRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["organization_id"]) {
      res.status(400).send("You must supply an 'organization_id' header.");
    } else {
      const orgID = req.headers["organization_id"];
      const user: any = req.authInfo;

      console.log(`User ${user.oid} wants to access ${orgID}`);

      readFile(
        join(__dirname, "../mock/organisations.json"),
        "utf-8",
        (e, text) => {
          if (e) {
            res.status(500);
          } else {
            // Look up organisation by ID
            const organisations: IOrganization[] = JSON.parse(text);
            const orgCtx: IOrganization | undefined = organisations.find(
              (org: any) => String(org.id) === orgID
            );

            if (
              !orgCtx ||
              orgCtx.members.findIndex((m) =>
                m.user === user.oid && !!role ? role === m.role : true
              ) === -1
            ) {
              res
                .status(401)
                .send("Not authorized to access this organization.");
            } else {
              console.log("context", orgCtx);
              next();
            }
          }
        }
      );
    }
  };
};

export const grantsAccess = function (action: any, resource: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permission = roles.can("ADMIN")[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
