import { NextApiRequest, NextApiResponse } from "next";
import FoodService from "../../server/resources/food/food.service";
import withProtect from "../../middleware/withProtect.middleware";

async function getFoods(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const fs = new FoodService();
      const result = await fs.getFoods();
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(500).json({ error: "failed to fetch data" });
    }
  }
}

export default withProtect(getFoods);
