//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import mongoose from "mongoose";

const CustomerPhotoSchema = new mongoose.Schema({
    path:{type: String, required: true, unique: true},
    order: {type: mongoose.Schema.Types.ObjectId, ref: "orders", required: true}
});

export const CustomerPhotoModel = mongoose.model("customerPhotos", CustomerPhotoSchema);