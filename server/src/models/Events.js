import mongoose from "mongoose";
import { CustomerPhotoModel } from "./CustomerPhotos.js";

const EventSchema = new mongoose.Schema({
    name:       {type: String, required: true},
    eventOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    photos:     [{type: mongoose.Schema.Types.ObjectId, ref: "customerPhotos"}],
    date:       {type: Date, required: true}    
});



export const EventModel = mongoose.model("Event", EventSchema);

