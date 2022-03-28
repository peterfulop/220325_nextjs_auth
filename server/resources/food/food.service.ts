import Food from "../food/food.model";
import mongoose from "mongoose";
import {
  FoodEntryCreateOptions,
  FoodEntryUpdateOptions,
} from "./food.interface";
import Mongoose from "../service/mongoose.service";

class FoodService extends Mongoose {
  constructor() {
    super();
    this.initialiseDatabaseConnection();
  }

  public async createFood(
    newFood: FoodEntryCreateOptions
  ): Promise<FoodEntryCreateOptions> {
    try {
      const food = await Food.create(newFood);
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateFood(
    id: string,
    updateFood: FoodEntryUpdateOptions
  ): Promise<FoodEntryCreateOptions> {
    try {
      const food = await Food.findByIdAndUpdate(id, updateFood, {
        new: true,
        runValidators: true,
      });
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteFood(id: string): Promise<FoodEntryCreateOptions> {
    try {
      const food = await Food.findByIdAndDelete(id);
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getFoods(): Promise<FoodEntryCreateOptions[]> {
    try {
      console.log("getFoods");
      const foods = await Food.find();
      return foods;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getFood(id: string): Promise<FoodEntryCreateOptions> {
    try {
      console.log("getFood");
      const food = await Food.findById(id);
      if (!food) throw new Error("nodata");
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default FoodService;
