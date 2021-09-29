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
