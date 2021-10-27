import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

let createUpdateOrganizationSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup
    .string()
    .oneOf(["HOTEL/MOTEL", "DIVING_SCHOOL", "DIY_PURPOSES", "OTHER"])
    .required(),
  description: yup.string().max(100),
});

async function validateCreateUpdateOrg(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.body = await createUpdateOrganizationSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err: any) {
    res.status(400).send({
      error: err.inner.map((e: any) => {
        return { path: e.path, type: e.type, message: e.message };
      }),
    });
  }
}
export default validateCreateUpdateOrg;
