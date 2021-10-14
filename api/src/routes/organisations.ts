import express from "express";
import controller from "../controllers/organisations";
import passport from "passport";
import { grantAccess,grantsAccess } from "../middleware/auth";
const router = express.Router();

router.post(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.create
);

router.get(
  "/",
  grantsAccess('readAny', 'organizations'),
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getAll
);

router.get(
  "/:id",
  passport.authenticate("oauth-bearer", { session: false }),
  grantAccess("readOwn", "organizations"),
  controller.getAll
);

export = router;
