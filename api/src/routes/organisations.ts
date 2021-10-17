import express, { NextFunction, request } from "express";
import controller from "../controllers/organisations";
import passport from "passport";
import { grantAccess, grantsAccess, isSuperAdmin } from "../middleware/auth";
const router = express.Router();

router.post(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  grantsAccess('createAny', 'organizations'),

  controller.create
);

router.get(
  "/", passport.authenticate("oauth-bearer", { session: false }),
  //grantsAccess('readOwn', 'organizations'),
  //no need to check access here as getOwn will only return orgs the current user has access to. 
  //passoport authenticate will ensure they are logged in
  (req,res,next)=>{
    if(isSuperAdmin()){
      controller.getAll
    }else{
      controller.getOwn
    }
  controller.getOwn
  next();
  }
);

router.get(
  "/:orgId",
  passport.authenticate("oauth-bearer", { session: false }),
  grantsAccess("readOwn", "organizations"),
  controller.getOne
);

export = router;
