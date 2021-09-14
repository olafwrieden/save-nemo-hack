// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { apiConfig, getToken, tokenRequest } from "../auth";
import { callApi } from "../utils/callGraph";

// getting all posts
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  try {
    // here we get an access token
    const authResponse = await getToken(tokenRequest);

    // call the web API with the access token

    const me = await callApi(
      apiConfig.uri + `/${req.authInfo["oid"]}`,
      authResponse!.accessToken
    );

    // display result
    let {
      id,
      displayName: name,
      givenName: first_name,
      surname: last_name,
      userPrincipalName: email,
    } = me;
    let meFormatted = { id, name, first_name, last_name, email };

    meFormatted.name === "unknown"
      ? (meFormatted.name = `${me.givenName} ${me.surname}`)
      : (meFormatted.name = "unknown");

    console.log(meFormatted);
    res.status(200).json(meFormatted);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getMe };
