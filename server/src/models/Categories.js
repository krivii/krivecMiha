//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

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
