import express from "express";
import controller from "../controllers/buoys";
import passport from "passport";
import { permission } from "../middleware/auth";
const router = express.Router();

router.get(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  permission("STANDARD"),
  controller.getAll
);

router.get(
  "/:id",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getAll
);

export = router;
