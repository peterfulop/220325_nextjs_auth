import Request from "../../../utils/interfaces/Request.interface";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";
import withValidation from "../../../middleware/withValidation.middleware";
import { FoodEntryCreateOptions } from "../../../server/resources/food/food.interface";
import FoodService from "../../../server/resources/food/food.service";
import { create } from "../../../server/resources/food/food.validation";
import protect from "../../../middleware/withProtect.middleware";
import withRoles from "../../../middleware/withRoles.middleware";
import NextConnectHandler from "../../../middleware/handler.middleware";
import { getSession } from "next-auth/react";
import ErrorObject from "../../../utils/interfaces/error.interface";
import setErrorDetails from "../../../utils/errorDetails";
import { RequestData } from "next/dist/server/web/types";

const nch = new NextConnectHandler();

export default nch.handler
  // .use(protect)
  // .use(async (req: Request, res: NextApiResponse, next: NextHandler) => {
  //   withRoles(req, res, next, ["user", "admin"]);
  // })

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
      console.log(name, details);
      const foodService = new FoodService();
      const data = await foodService.createFood({ name, details });
      res.status(201).json({ status: "success", data });
    }, create)
  );
