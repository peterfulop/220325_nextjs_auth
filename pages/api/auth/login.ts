import { NextApiResponse } from "next";
import UserService from "../../../server/resources/user/user.service";
import Request from "../../../utils/interfaces/Request.interface";
import { createSendToken } from "../../../utils/token";
import withValidation from "../../../middleware/withValidation.middleware";
import { login } from "../../../server/resources/user/user.validation";
import withoutProtect from "../../../middleware/withoutProtect.middleware";

export default withoutProtect.post(
  withValidation(async (req: Request, res: NextApiResponse) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({
          status: "Please provide email and password!",
        });
      }
      const userService = new UserService();
      const user = await userService.login(username, password);
      if (!user) throw Error("loginerror");
      createSendToken(user._id, 200, req, res);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, login)
);
