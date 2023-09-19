import mongoose from "mongoose";

const PromoPhotoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    path:{type: String, required: true, unique: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true}
});

export const PromoPhotoModel = mongoose.model("promoPhotos", PromoPhotoSchema);