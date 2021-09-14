import express from "express";
import controller from "../controllers/auth";
import passport from "passport";
const router = express.Router();

router.get(
  "/me",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getMe
);

export = router;
