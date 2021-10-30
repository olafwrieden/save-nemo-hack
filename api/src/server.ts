import "dotenv/config";
import express, { Express } from "express";
import http from "http";
import morgan from "morgan";
import passport from "passport";
import {
  BearerStrategy,
  IBearerStrategyOptionWithRequest,
} from "passport-azure-ad";
import * as config from "./auth/config.json";
import organisations from "./routes/organisations";
import users from "./routes/users";
import buoys from "./routes/buoys";

const options: IBearerStrategyOptionWithRequest = {
  identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
  clientID: config.credentials.clientID,
  audience: config.credentials.clientID,
  policyName: config.policies.policyName,
  isB2C: config.settings.isB2C,
  validateIssuer: config.settings.validateIssuer,
  passReqToCallback: config.settings.passReqToCallback,
};

const bearerStrategy = new BearerStrategy(options, (token: any, done: any) => {
  // Send user info using the second argument
  done(null, {}, token);
});

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** Use passport middleware */
router.use(passport.initialize());
passport.use(bearerStrategy);

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept, Authorization organization_id"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use("/", users);
// router.use("/buoys", buoys);
router.use("/organizations/:orgId/bouys", buoys);
router.use("/organizations", organisations);

router.get("/", (req, res) => {
  console.log("Validated claims: ", req.authInfo);
  res.status(200).json({ message: "Hi there!" });
});

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
