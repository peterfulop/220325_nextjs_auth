import { NextApiRequest, NextApiResponse } from "next";
import FoodService from "../../../server/resources/food/food.service";
export default async function getFoods(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query as { id: string };
      const fs = new FoodService();
      const result = await fs.getFood(id);
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(500).json({ error: "failed to fetch data" });
    }
  }
}
