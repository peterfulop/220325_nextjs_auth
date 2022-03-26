import Cookies from "cookies";
import { NextApiResponse } from "next";
import Request from "../../../utils/interfaces/Request.interface";
import withProtect from "../../../middleware/withProtect.middleware";
// import withRoles from "../../../../middleware/withRoles.middleware";

const handler = async (req: Request, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      success: false,
      message: "Only POST request are allowed",
    });
  }

  try {
    const cookies = Cookies(req, res);
    cookies.set("jwt", "expired", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    return res.status(200).json({
      status: "You logged out!",
      statusCode: res.statusCode,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "Server error",
      statusCode: res.statusCode,
    });
  }
};

export default withProtect(handler);
// export default protect(withRoles(handler, ["admin"]));
