'use server'

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    weight: {
        value: {type: Number},
        unit: {type: String},
    },
    height: {
        value: {type: Number},
        unit: {type: String},
    },
    macroGoal: {
        calories: {type:Number},
        protein: {type:Number},
        carbs: {type:Number},
        fat: {type:Number},
    }
}, { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;