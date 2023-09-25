import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    iframe:{type: String, required: true}

});

export const VideoModel = mongoose.model("videos", VideoSchema);