import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db";
import MealLog from "@/app/model/mealLog.model";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, date, mealType, items } = await req.json();

    let log = await MealLog.findOne({ user: userId, date });
    if (!log) {
      log = new MealLog({
        user: userId,
        date,
        meals: { breakfast: [], lunch: [], snacks: [], dinner: [] }
      });
    }

    log.meals[mealType].push(...items);
    await log.save();

    return NextResponse.json({ success: true, log });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
