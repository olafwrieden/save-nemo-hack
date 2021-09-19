// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { apiConfig, getToken, tokenRequest } from "../auth";
import { callApi, patchAPI } from "../utils/callGraph";

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

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  try {
    const authResponse = await getToken(tokenRequest);

    const users = await callApi(apiConfig.uri + `/`, authResponse!.accessToken);

    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Validated claims: ", req.authInfo);

  if (!req.params.id) {
    return res.status(400).json("You must supply a user id.");
  }

  const userId: string = req.params.id;

  try {
    const authResponse = await getToken(tokenRequest);

    const user = await patchAPI(
      apiConfig.uri + `/${userId}`,
      authResponse!.accessToken,
      JSON.stringify(req.body)
    );

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getMe, getAll, updateUser };
