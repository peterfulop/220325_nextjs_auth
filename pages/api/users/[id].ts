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
    const { id } = req.query as { id: string };
    const userService = new UserService();
    const result = await userService.getUser(id);
    res.status(200).json({ status: "success", data: result });
  })
  .delete(async (req: Request, res: NextApiResponse) => {
    const { id } = req.query as { id: string };
    const userService = new UserService();
    await userService.deleteUser(id);
    res.status(202).json({
      status: "success",
      message: "Document has been deleted",
    });
  });
