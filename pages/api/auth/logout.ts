import Cookies from "cookies";
import { NextApiResponse } from "next";
import Request from "../../../utils/interfaces/Request.interface";
import protect from "../../../middleware/withProtect.middleware";
import NextConnectHandler from "../../../middleware/handler.middleware";

const nch = new NextConnectHandler();

export default nch.handler
  .use(protect)
  .post((req: Request, res: NextApiResponse) => {
    console.log("itt");

    const cookies = Cookies(req, res);
    cookies.set("jwt", "expired", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    });
    return res.status(200).json({
      status: "You logged out!",
    });
  });
