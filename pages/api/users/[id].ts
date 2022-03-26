import { NextApiResponse } from "next";
import Request from "../../../utils/interfaces/Request.interface";
import withProtect from "../../../middleware/withProtect.middleware";
import UserService from "../../../server/resources/user/user.service";
import withRoles from "../../../middleware/withRoles.middleware";

export default withProtect
  .get(
    withRoles(
      async (req: Request, res: NextApiResponse) => {
        const { id } = req.query as { id: string };
        const userService = new UserService();
        const result = await userService.getUser(id);
        res.status(200).json({ status: "success", data: result });
      },
      ["user"]
    )
  )
  .delete(
    withRoles(
      async (req: Request, res: NextApiResponse) => {
        const { id } = req.query as { id: string };
        const userService = new UserService();
        await userService.deleteUser(id);
        res.status(202).json({
          status: "success",
          message: "Document has been deleted",
        });
      },
      ["user"]
    )
  );
