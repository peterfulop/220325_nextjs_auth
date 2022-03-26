import { NextApiResponse } from "next";
import { verifyToken } from "../utils/token";
import User from "../server/resources/user/user.model";
import Request from "../utils/interfaces/Request.interface";
import nextConnect from "next-connect";
import ErrorObject from "../utils/interfaces/error.interface";
import setErrorDetails from "../utils/errorDetails";

const withProtect = nextConnect<Request, NextApiResponse>({
  onError(error, req, res) {
    const errorObj: ErrorObject = setErrorDetails(error);
    res.status(errorObj.statusCode).send({
      error: errorObj.errorMessage,
      statusCode: errorObj.statusCode,
    });
  },
  onNoMatch(req, res) {
    res.status(500).send({
      error: "Something went wrong",
    });
  },
}).use(async (req: Request, res: NextApiResponse, next) => {
  let token: string | undefined;
  console.log("protected middleware rout!");
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
});

export default withProtect;
