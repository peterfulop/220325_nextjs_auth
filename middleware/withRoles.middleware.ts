import { NextApiRequest, NextApiResponse } from "next";
import Request from "../utils/interfaces/Request.interface";

const withRoles = (handler: Function, ...roles: any) => {
  return async (req: Request, res: NextApiResponse) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action!",
      });
    }
    return handler(req, res);
  };
};

export default withRoles;
