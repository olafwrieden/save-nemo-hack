import express from "express";
import passport from "passport";
import controller from "../controllers/organisations";
import { grantsAccess, isSuperAdmin } from "../middleware/auth";
import { validateInput } from "../middleware/validate";
import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "../middleware/validate.orgs";
const router = express.Router();

/**
 * Create New Organization
 */
router.post(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  // grantsAccess("createAny", "organizations"),
  validateInput(createOrganizationSchema),
  controller.create
);

/**
 * Get All Organizations (that user is a member of)
 */
router.get(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getOwn
  //grantsAccess('readOwn', 'organizations'),
  //no need to check access here as getOwn will only return orgs the current user has access to.
  //passport authenticate will ensure they are logged in
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
  validateInput(updateOrganizationSchema),
  controller.updateOne
);

export = router;
