import mongoose from "mongoose";

const PromoPhotoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    path:{type: String, required: true}
});

export const PromoPhotoModel = mongoose.model("promoPhotos", PromoPhotoSchema);