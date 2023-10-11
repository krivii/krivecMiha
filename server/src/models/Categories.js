import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    photos: {
        type: [String], 
        required: true,     },
    cover: {
        type: String,
        required: true,
        unique: true,
    }
});

export const CategoryModel = mongoose.model("categories", CategorySchema);
