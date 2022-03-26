import { NextApiResponse } from "next";
import Request from "../../../utils/interfaces/Request.interface";
import withProtect from "../../../middleware/withProtect.middleware";
import FoodService from "../../../server/resources/food/food.service";
import withRoles from "../../../middleware/withRoles.middleware";
import { FoodEntryUpdateOptions } from "../../../server/resources/food/food.interface";
import withValidation from "../../../middleware/withValidation.middleware";
import { create } from "../../../server/resources/food/food.validation";

export default withProtect
  .get(
    withRoles(
      async (req: Request, res: NextApiResponse) => {
        const { id } = req.query as { id: string };
        const foodService = new FoodService();
        const result = await foodService.getFood(id);
        res.status(200).json({ status: "success", data: result });
      },
      ["user"]
    )
  )
  .put(
    withRoles(
      withValidation(async (req: Request, res: NextApiResponse) => {
        const { name, details } = req.body as FoodEntryUpdateOptions;
        const { id } = req.query as { id: string };
        const foodService = new FoodService();
        const data = await foodService.updateFood(id, { name, details });
        if (!data) throw Error("nodata");
        res.status(200).json({
          status: "success",
          message: "Document has been updated",
          data,
        });
      }, create),
      ["user"]
    )
  )
  .delete(
    withRoles(
      async (req: Request, res: NextApiResponse) => {
        const { id } = req.query as { id: string };
        const foodService = new FoodService();
        await foodService.deleteFood(id);
        res.status(202).json({
          status: "success",
          message: "Document has been deleted",
        });
      },
      ["user"]
    )
  );
