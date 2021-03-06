import Request from "../../../utils/interfaces/Request.interface";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import UserService from "../../../server/resources/user/user.service";
import withRoles from "../../../middleware/withRoles.middleware";
import protect from "../../../middleware/withProtect.middleware";

import NextConnectHandler from "../../../middleware/handler.middleware";
const nch = new NextConnectHandler();

export default nch.handler
  .use(protect)
  .use(async (req: Request, res: NextApiResponse, next: NextHandler) => {
    withRoles(req, res, next, ["admin"]);
  })
  .get(async (req: Request, res: NextApiResponse) => {
    const userService = new UserService();
    const result = await userService.getUsers();
    res
      .status(200)
      .json({ status: "success", results: result.length, data: result });
  });
