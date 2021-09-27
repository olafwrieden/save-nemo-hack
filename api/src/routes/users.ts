import express from "express";
import controller from "../controllers/users";
import passport from "passport";
const router = express.Router();

router.get(
  "/me",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getMe
);

router.get(
  "/users",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.getAll
);

router.patch(
  "/users/:id",
  passport.authenticate("oauth-bearer", { session: false }),
  controller.updateUser
);

export = router;
