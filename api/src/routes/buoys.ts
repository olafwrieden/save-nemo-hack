import express from "express";
import passport from "passport";
import controller from "../controllers/buoys";
const router = express.Router();

router.get(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getAll
);

router.get(
  "/:id",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getAll
);

export = router;
