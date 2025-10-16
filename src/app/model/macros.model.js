import mongoose from "mongoose";

const MealItemSchema = new mongoose.Schema({
  name: String,            // e.g. "Boiled Egg"
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  quantity: Number,        // optional
}, { _id: false });

const MealLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String,           // e.g. "2025-07-30"
    required: true
  },
  meals: {
    breakfast: [MealItemSchema],
    lunch: [MealItemSchema],
    dinner: [MealItemSchema],
    snacks: [MealItemSchema]
  }
}, { timestamps: true });

MealLogSchema.index({ user: 1, date: 1 }, { unique: true }); // ensure only one log per day per user

export default mongoose.models.MealLog || mongoose.model("MealLog", MealLogSchema);
