// app/api/nutrition/route.js
import { NextResponse } from "next/server";
import { getNutritionalInfo } from "../gemini/gemini";

export async function POST(req) {
  try {
    const { foodQuery } = await req.json();

    if (!foodQuery || foodQuery.trim() === "") {
      return NextResponse.json({ error: "No food query provided" }, { status: 400 });
    }

    const data = await getNutritionalInfo(foodQuery);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Failed to fetch nutrition data" }, { status: 500 });
  }
}
