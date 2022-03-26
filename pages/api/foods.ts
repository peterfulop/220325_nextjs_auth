import { NextApiRequest, NextApiResponse } from "next";
import FoodController from "../../server/resources/food/food.controller";

export default async function getFoods(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const fc = new FoodController();
      const result = await fc.getAll();
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(500).json({ error: "failed to fetch data" });
    }
  }
}
