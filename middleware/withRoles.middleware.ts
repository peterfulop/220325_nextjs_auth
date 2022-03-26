import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import setErrorDetails from "../utils/errorDetails";
import ErrorObject from "../utils/interfaces/error.interface";
import Request from "../utils/interfaces/Request.interface";

const withRoles = (handler: Function, roles: string[]) => {
  console.log("root with roles!");

  return async (req: Request, res: NextApiResponse) => {
    console.log(roles);

    if (!roles.includes(req.user.role as string)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action!",
      });
    }
    return handler(req, res);
  };
};

export default withRoles;
