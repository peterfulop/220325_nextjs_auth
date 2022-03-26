import { NextApiResponse } from "next";
import { UserCreateOptions } from "../../../server/resources/user/user.interface";
import UserService from "../../../server/resources/user/user.service";
import Request from "../../../utils/interfaces/Request.interface";
import { createSendToken } from "../../../utils/token";
import withValidation from "../../../middleware/withValidation.middleware";
import { signup } from "../../../server/resources/user/user.validation";
import withoutProtect from "../../../middleware/withoutProtect.middleware";

export default withoutProtect.post(
  withValidation(async (req: Request, res: NextApiResponse) => {
    const { username, email, password, passwordConfirm } =
      req.body as UserCreateOptions;
    const userService = new UserService();
    const user = await userService.signup({
      username,
      email,
      password,
      passwordConfirm,
    });
    createSendToken(user._id as string, 200, req, res);
  }, signup)
);
