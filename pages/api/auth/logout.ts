import Cookies from "cookies";
import { NextApiResponse } from "next";
import Request from "../../../utils/interfaces/Request.interface";
import withProtect from "../../../middleware/withProtect.middleware";

export default withProtect.post((req: Request, res: NextApiResponse) => {
  const cookies = Cookies(req, res);
  cookies.set("jwt", "expired", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return res.status(200).json({
    status: "You logged out!",
  });
});
