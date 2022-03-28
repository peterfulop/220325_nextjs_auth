import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import Request from "../utils/interfaces/Request.interface";

const withRoles = (
  req: Request,
  res: NextApiResponse,
  next: NextHandler,
  roles: string[]
) => {
  if (!roles.includes(req.user.role as string)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to perform this action!",
    });
  }
  return next();
};

export default withRoles;
