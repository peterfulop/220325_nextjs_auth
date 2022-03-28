import Request from "../../../utils/interfaces/Request.interface";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import handler from "../../../middleware/handler.middleware";
import withValidation from "../../../middleware/withValidation.middleware";
import { FoodEntryCreateOptions } from "../../../server/resources/food/food.interface";
import FoodService from "../../../server/resources/food/food.service";
import { create } from "../../../server/resources/food/food.validation";
import protect from "../../../middleware/withProtect.middleware";
import withRoles from "../../../middleware/withRoles.middleware";

export default handler
  .use(protect)
  .use(async (req: Request, res: NextApiResponse, next: NextHandler) => {
    withRoles(req, res, next, ["user", "admin"]);
  })
  .get(async (req: Request, res: NextApiResponse) => {
    const foodService = new FoodService();
    const result = await foodService.getFoods();
    res
      .status(200)
      .json({ status: "success", results: result.length, data: result });
  })
  .post(
    withValidation(async (req: Request, res: NextApiResponse) => {
      const { name, details } = req.body as FoodEntryCreateOptions;
      const foodService = new FoodService();
      const data = await foodService.createFood({ name, details });
      res.status(201).json({ status: "success", data });
    }, create)
  );
