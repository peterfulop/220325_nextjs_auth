import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.jwt!,
      "622c732197a547ae52240eca",
      async function (err, decoded) {
        if (!err && decoded) {
          return await fn(req, res);
        }
      }
    );
    res.status(401).json({ message: "Sorry, not logged in" });
  };

export default authenticated(async function getFoods(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const serverFetch = await fetch("http://127.0.0.1:3002/api/v1/food");
  //   const data = await serverFetch.json();
  res.json({});
});
