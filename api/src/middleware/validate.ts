import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "yup";

export const validateInput =
  (resourceSchema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;

    try {
      await resourceSchema.validate(resource, { abortEarly: false });
      next();
    } catch (err: any) {
      console.error(err);
      res.status(400).send({
        error: err.inner.map((e: any) => {
          return { path: e.path, type: e.type, message: e.message };
        }),
      });
    }
  };
