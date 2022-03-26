import FoodService from "../food/food.service";
import {
  FoodEntryCreateOptions,
  FoodEntryUpdateOptions,
} from "./food.interface";
import HttpExceptions from "../../exceptions/http.exception";
import { NextApiRequest, NextApiResponse } from "next";

class FoodController {
  private FoodService = new FoodService();

  public getAll = async () => {
    try {
      return await this.FoodService.getFoods();
    } catch (error: any) {
      // next(new HttpExceptions(500, error.message));
      console.error(error);
    }
  };

  public getOne = async (id: string): Promise<Response | any> => {
    try {
      // const { id } = req.query as { id: string };
      const data = await this.FoodService.getFood(id);
      if (!data) throw Error("nodata");
      return data;
      // res.status(200).json({
      //   status: "success",
      //   statusCode: res.statusCode,
      //   data,
      // });
    } catch (error: any) {
      new HttpExceptions(500, error.message);
      // console.error(error);
    }
  };

  public create = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<Response | void> => {
    try {
      const { name, details } = req.body as FoodEntryCreateOptions;
      const data = await this.FoodService.createFood({ name, details });
      res
        .status(201)
        .json({ status: "success", statusCode: res.statusCode, data });
    } catch (error: any) {
      // next(new HttpExceptions(500, error.message));
      console.error(error);
    }
  };

  public update = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<Response | void> => {
    try {
      const { name, details } = req.body as FoodEntryUpdateOptions;
      const { id } = req.query as { id: string };
      const data = await this.FoodService.updateFood(id, { name, details });
      if (!data) throw Error("nodata");
      res.status(200).json({
        status: "success",
        statusCode: res.statusCode,
        message: "Document has been updated",
        data,
      });
    } catch (error: any) {
      // next(new HttpExceptions(500, error.message));
      console.error(error);
    }
  };

  public delete = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<Response | void> => {
    try {
      const { id } = req.query as { id: string };
      await this.FoodService.deleteFood(id);
      res.status(204).json({
        status: "success",
        statusCode: res.statusCode,
        message: "Document has been deleted",
      });
    } catch (error: any) {
      // next(new HttpExceptions(500, error.message));
      console.error(error);
    }
  };
}

export default FoodController;
