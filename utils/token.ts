import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import Request from "./interfaces/Request.interface";
import Token from "./interfaces/token.interface";
import cookie from "cookie";
import Cookies from "cookies";

export const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, rejects) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return rejects(err);
      resolve(payload as Token);
    });
  });
};

export const createSendToken = (
  userId: string,
  statusCode: number,
  req: Request,
  res: NextApiResponse
): void => {
  const token = signToken(userId);
  const cookieExpiresIn: number = Number(process.env.JWT_COOKIE_EXPIRES_IN);
  const cookieOptions: any = {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  const cookies = new Cookies(req, res);
  cookies.set("jwt", token, cookieOptions);
  res.status(statusCode).json({
    statusCode,
    status: "success",
    token,
    userId,
  });
};
