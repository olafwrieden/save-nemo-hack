// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import { apiConfig, getToken, tokenRequest } from "../auth";
import { getAttribute } from "../utils/attributes";
import { callApi, patchAPI } from "../utils/callGraph";

// GET /me
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let meFormatted = {
      id: String(req.authInfo["oid"]),
      name: String(req.authInfo["name"]),
      first_name: String(req.authInfo["given_name"]),
      last_name: String(req.authInfo["family_name"]),
      isVolunteer: !!req.authInfo["extension_Volunteer"],
    };

    res.status(200).json(meFormatted);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authResponse = await getToken(tokenRequest);

    const attributeSelector = `$select=id,displayName,givenName,surname,${getAttribute(
      "Volunteer"
    )}`;
    const users = await callApi(
      apiConfig.uri + `/?${attributeSelector}`,
      authResponse!.accessToken
    );

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
