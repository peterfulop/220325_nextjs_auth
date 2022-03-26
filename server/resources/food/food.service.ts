import Food from "../food/food.model";
import mongoose from "mongoose";
import {
  FoodEntryCreateOptions,
  FoodEntryUpdateOptions,
} from "./food.interface";

class FoodService {
  // public DB: string;
  constructor() {
    const DB =
      "mongodb+srv://peterfulop_:MgIK3MQKQuC10xTN@clusterfoodproject.qrpy7.mongodb.net/myFirstDatabase";
    mongoose
      .connect(DB)
      .then(() => {
        console.log("Online DB connection successful!");
      })
      .catch(() => {
        mongoose.connect(String(process.env.MONGO_LOCAL)).then(() => {
          console.log("Local DB connection successful!");
        });
      });
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
      const foods = await Food.find();
      return foods;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getFood(id: string): Promise<FoodEntryCreateOptions> {
    try {
      const food = await Food.findById(id);
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default FoodService;
