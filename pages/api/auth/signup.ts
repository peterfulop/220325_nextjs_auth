import Request from "../../../utils/interfaces/Request.interface";
import { NextApiResponse } from "next";
import { UserCreateOptions } from "../../../server/resources/user/user.interface";
import UserService from "../../../server/resources/user/user.service";
import withValidation from "../../../middleware/withValidation.middleware";
import { signup } from "../../../server/resources/user/user.validation";
import NextConnectHandler from "../../../middleware/handler.middleware";

const nch = new NextConnectHandler();

export default nch.handler.post(
  withValidation(async (req: Request, res: NextApiResponse) => {
    console.log("Create user....");

    const { username, email, password, passwordConfirm } =
      req.body as UserCreateOptions;
    const userService = new UserService();
    const user = await userService.signup({
      username,
      email,
      password,
      passwordConfirm,
    });

    console.log(user);

    res.status(201).json({ message: "Created user!" });
    // createSendToken(user._id as string, 200, req, res);
  }, signup)
);
