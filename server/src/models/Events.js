import mongoose from "mongoose";
import { CustomerPhotoModel } from "./CustomerPhotos.js";

const EventSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    eventOwner: {type: mongoose.Schema.Types.String, ref: "users", required: true},
    photos:  [{type: mongoose.Schema.Types.ObjectId, ref: "customerPhotos"}],
    date:{type: Date, required: true}    
});

// Mongoose middleware to remove associated photos before deleting the event
EventSchema.pre("deleteOne", async function (next) {

    console.log("User found in the database:");
  try {
    // Remove all photos associated with this event
    await CustomerPhotoModel.deleteMany({ _id: { $in: this.photos } });

    next();
  } catch (error) {
    next(error);
  }
});


export const EventModel = mongoose.model("Event", EventSchema);

