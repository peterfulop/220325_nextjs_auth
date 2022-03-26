import { NextApiResponse } from "next";
import Request from "../../../utils/interfaces/Request.interface";
import withProtect from "../../../middleware/withProtect.middleware";
import UserService from "../../../server/resources/user/user.service";
import withRoles from "../../../middleware/withRoles.middleware";

export default withProtect.get(
  withRoles(
    async (req: Request, res: NextApiResponse) => {
      const userService = new UserService();
      const result = await userService.getUsers();
      res
        .status(200)
        .json({ status: "success", results: result.length, data: result });
    },
    ["user"]
  )
);
