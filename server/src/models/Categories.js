import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    photos:  [{type: mongoose.Schema.Types.ObjectId, ref: "promoPhotos"}],

});

export const CategoryModel = mongoose.model("categories", CategorySchema);