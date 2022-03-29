import Request from "../../../utils/interfaces/Request.interface";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import FoodService from "../../../server/resources/food/food.service";
import withRoles from "../../../middleware/withRoles.middleware";
import { FoodEntryUpdateOptions } from "../../../server/resources/food/food.interface";
import withValidation from "../../../middleware/withValidation.middleware";
import { create } from "../../../server/resources/food/food.validation";
import protect from "../../../middleware/withProtect.middleware";
import NextConnectHandler from "../../../middleware/handler.middleware";

const nch = new NextConnectHandler();

export default nch.handler
  .use(protect)
  // .use(async (req: Request, res: NextApiResponse, next: NextHandler) => {
  //   withRoles(req, res, next, ["user", "admin"]);
  // })
  .get(async (req: Request, res: NextApiResponse) => {
    const foodService = new FoodService();
    const result = await foodService.getFoodIdList();
    res.status(200).json({ status: "success", data: result });
  });
