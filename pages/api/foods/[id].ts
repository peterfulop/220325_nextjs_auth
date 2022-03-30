import Request from "../../../utils/interfaces/Request.interface";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import FoodService from "../../../server/resources/food/food.service";
import withRoles from "../../../middleware/withRoles.middleware";
import { FoodEntryUpdateOptions } from "../../../server/resources/food/food.interface";
import withValidation from "../../../middleware/withValidation.middleware";
import { update } from "../../../server/resources/food/food.validation";
import protect from "../../../middleware/withProtect.middleware";
import NextConnectHandler from "../../../middleware/handler.middleware";

const nch = new NextConnectHandler();

export default nch.handler
  // .use(protect)
  // .use(async (req: Request, res: NextApiResponse, next: NextHandler) => {
  //   withRoles(req, res, next, ["user", "admin"]);
  // })
  .get(async (req: Request, res: NextApiResponse) => {
    const foodService = new FoodService();
    const { id } = req.query as { id: string };
    const result = await foodService.getFood(id);
    res.status(200).json({ status: "success", data: result });
  })
  .put(
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
    }, update)
  )
  .delete(async (req: Request, res: NextApiResponse) => {
    const { id } = req.query as { id: string };
    const foodService = new FoodService();
    await foodService.deleteFood(id);
    res.status(202).json({
      status: "success",
      message: "Document has been deleted",
    });
  });
