import mongoose from "mongoose";

const CustomerPhotoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    path:{type: String, required: true},
    event: {type: mongoose.Schema.Types.ObjectId, ref: "events", required: true}
});

export const CustomerPhotoModel = mongoose.model("customerPhotos", CustomerPhotoSchema);