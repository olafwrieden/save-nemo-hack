import express from "express";
import controller from "../controllers/organisations";
import passport from "passport";
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
