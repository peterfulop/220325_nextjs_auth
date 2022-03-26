import { NextApiResponse } from "next";
import Request from "../../utils/interfaces/Request.interface";
import withProtect from "../../middleware/withProtect.middleware";
import withValidation from "../../middleware/withValidation.middleware";
import { FoodEntryCreateOptions } from "../../server/resources/food/food.interface";
import FoodService from "../../server/resources/food/food.service";
import { create } from "../../server/resources/food/food.validation";
import withRoles from "../../middleware/withRoles.middleware";

export default withProtect
  .post(
    withRoles(
      withValidation(async (req: Request, res: NextApiResponse) => {
        const { name, details } = req.body as FoodEntryCreateOptions;
        console.log(name, details);
        const foodService = new FoodService();
        const data = await foodService.createFood({ name, details });
        res.status(201).json({ status: "success", data });
      }, create),
      ["user"]
    )
  )
  .get(
    withRoles(
      async (req: Request, res: NextApiResponse) => {
        const foodService = new FoodService();
        const result = await foodService.getFoods();
        res
          .status(200)
          .json({ status: "success", results: result.length, data: result });
      },
      ["user"]
    )
  );
