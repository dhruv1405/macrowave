// lib/getNutritionData.js
import { GoogleGenAI, Type } from "@google/genai";

export async function getNutritionalInfo(foodQuery) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        foodName: { type: Type.STRING },
        calories: { type: Type.NUMBER },
        fat: {
          type: Type.OBJECT,
          properties: {
            total: { type: Type.NUMBER },
            saturated: { type: Type.NUMBER },
            trans: { type: Type.NUMBER },
          },
          required: ["total", "saturated", "trans"],
        },
        cholesterol: { type: Type.NUMBER },
        sodium: { type: Type.NUMBER },
        carbohydrates: {
          type: Type.OBJECT,
          properties: {
            total: { type: Type.NUMBER },
            fiber: { type: Type.NUMBER },
            sugars: { type: Type.NUMBER },
          },
          required: ["total", "fiber", "sugars"],
        },
        protein: { type: Type.NUMBER },
      },
      required: [
        "foodName",
        "calories",
        "fat",
        "cholesterol",
        "sodium",
        "carbohydrates",
        "protein",
      ],
    },
  };

  const fullPrompt = `You are a nutritional expert. Based on FatSecret's database standards, 
  provide a detailed nutritional breakdown for: "${foodQuery}". 
  Return the data as a JSON array of objects, even for a single item.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  return JSON.parse(response.text);
}
