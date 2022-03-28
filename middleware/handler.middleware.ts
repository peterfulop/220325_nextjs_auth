import ErrorObject from "../utils/interfaces/error.interface";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import Request from "../utils/interfaces/Request.interface";
import setErrorDetails from "../utils/errorDetails";

class NextConnectHandler {
  public handler = nextConnect<Request, NextApiResponse>({
    onError(error, req, res) {
      // console.log(error);
      const errorObj: ErrorObject = setErrorDetails(error);
      res.status(errorObj.statusCode).send({
        error: errorObj.errorMessage,
      });
    },
    onNoMatch(req, res) {
      res.status(500).send({
        error: "Something went wrong",
      });
    },
  });
}

export default NextConnectHandler;
