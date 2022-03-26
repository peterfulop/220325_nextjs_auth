import { NextApiResponse } from "next";
import { verifyToken } from "../utils/token";
import User from "../server/resources/user/user.model";
import Request from "../utils/interfaces/Request.interface";

const protect = (handler: Function) => {
  return async (req: Request, res: NextApiResponse) => {
    try {
      let token: string | undefined;
      console.log("protected rout!");

      if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        // throw new Error("notoken");
        return res.status(401).json({
          success: false,
          message: "Invalid token, please log in!",
        });
      }
      const decoded = await verifyToken(token);
      const activeUser = await User.findById(Object(decoded).id);
      if (!activeUser) {
        //throw new Error("nouser");
        return res.status(401).json({
          success: false,
          message: "The user belong to this token no longer exists",
        });
      }

      req.user = activeUser;

      return handler(req, res);
    } catch (error: any) {
      //   ErrorMiddleware(error, req, res, handler);
      return res.status(401).json({
        success: false,
        message: "Please login to get access",
      });
    }
  };
};

export default protect;
