import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A food must have a name!"],
      unique: true,
      trim: true,
    },
    details: {
      type: mongoose.Schema.Types.Map,
      unit: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.models.Food || mongoose.model("Food", FoodSchema);
export default Food;
