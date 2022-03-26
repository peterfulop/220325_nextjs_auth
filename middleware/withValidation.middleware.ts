import Joi from "joi";
import { NextApiResponse } from "next";
import Request from "../utils/interfaces/Request.interface";

const withValidation = (handler: Function, schema: Joi.Schema) => {
  return async (req: Request, res: NextApiResponse) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      return handler(req, res);
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationError) => {
        errors.push(error.message);
      });
      res.status(400).send({ error: errors, statusCode: 400, status: "error" });
    }
  };
};

export default withValidation;
