import express from "express";
import passport from "passport";
import controller from "../controllers/organisations";
import { grantsAccess, isSuperAdmin } from "../middleware/auth";
import validateCreateUpdateOrg from "../middleware/validate.orgs";
const router = express.Router();

/**
 * Create New Organization
 */
router.post(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  grantsAccess("createAny", "organizations"),
  validateCreateUpdateOrg,
  controller.create
);

/**
 * Get All Organizations
 */
router.get(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  //grantsAccess('readOwn', 'organizations'),
  //no need to check access here as getOwn will only return orgs the current user has access to.
  //passoport authenticate will ensure they are logged in
  (req, res, next) => {
    if (isSuperAdmin()) {
      controller.getAll;
    } else {
      controller.getOwn;
    }
    controller.getOwn;
    next();
  }
);

/**
 * Get Specific Organization
 */
router.get(
  "/:orgId",
  passport.authenticate("oauth-bearer", { session: false }),
  grantsAccess("readOwn", "organizations"),
  controller.getOne
);

/**
 * Update Specific Organization
 */
router.patch(
  "/:orgId",
  passport.authenticate("oauth-bearer", { session: false }),
  grantsAccess("updateOwn", "organizations"),
  validateCreateUpdateOrg,
  controller.updateOne
);

export = router;
