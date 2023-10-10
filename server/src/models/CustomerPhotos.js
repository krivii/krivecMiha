import mongoose from "mongoose";

const CustomerPhotoSchema = new mongoose.Schema({
    path:{type: String, required: true, unique: true},
    order: {type: mongoose.Schema.Types.ObjectId, ref: "orders", required: true}
});

export const CustomerPhotoModel = mongoose.model("customerPhotos", CustomerPhotoSchema);