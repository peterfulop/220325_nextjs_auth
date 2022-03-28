import { NextApiResponse } from "next";
import { verifyToken } from "../utils/token";
import User from "../server/resources/user/user.model";
import Request from "../utils/interfaces/Request.interface";
import { NextHandler } from "next-connect";

export const protect = async (
  req: Request,
  res: NextApiResponse,
  next: NextHandler
) => {
  let token: string | undefined;
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new Error("notoken");
  }
  const decoded = await verifyToken(token);
  const activeUser = await User.findById(Object(decoded).id);
  if (!activeUser) {
    throw new Error("nouser");
  }
  req.user = activeUser;
  next();
};

export default protect;
