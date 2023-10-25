//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import mongoose from "mongoose";

const PromoPhotoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    path:{type: String, required: true}
});

export const PromoPhotoModel = mongoose.model("promoPhotos", PromoPhotoSchema);