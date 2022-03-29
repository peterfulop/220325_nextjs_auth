import { NextApiResponse } from "next";
import { verifyToken } from "../utils/token";
import Request from "../utils/interfaces/Request.interface";
import { NextHandler } from "next-connect";
import UserService from "../server/resources/user/user.service";
import { getSession } from "next-auth/react";
import { hasPassword, verifyPassword } from "../lib/auth";

export const protect = async (
  req: Request,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req: req });
  if (!session) {
    return res.status(401).json({
      message: "Not authenticated!!!!",
    });
  }

  const userEmail = session.user?.email;
  const userService = new UserService();
  const activeUser = await userService.getUser(userEmail as string);
  if (!activeUser) {
    return res.status(404).json({
      message: "User not found!",
    });
  }
  req.user = activeUser;
  next();
};

// export const protect = async (
//   req: Request,
//   res: NextApiResponse,
//   next: NextHandler
// ) => {
//   let token: string | undefined;

//   if (req.cookies && req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }
//   if (!token) {
//     throw new Error("notoken");
//   }
//   const decoded = await verifyToken(token);

//   const userService = new UserService();

//   const activeUser = await userService.getUser(Object(decoded).id);
//   if (!activeUser) {
//     throw new Error("nouser");
//   }
//   req.user = activeUser;
//   next();
// };

export default protect;
