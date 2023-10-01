import mongoose from "mongoose";


const EventSchema = new mongoose.Schema({
    name:       {type: String, required: true},
    eventOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    photos:     [{type: mongoose.Schema.Types.ObjectId, ref: "customerPhotos"}],
    date:       {type: Date, required: true}    
});



export const EventModel = mongoose.model("Event", EventSchema);

