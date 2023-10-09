import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    name:       {type: String, required: true},
    orderOwner: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    photos:     [{type: mongoose.Schema.Types.ObjectId, ref: "customerPhotos"}],
    date:       {type: Date, required: true}    
});



export const OrderModel = mongoose.model("Order", OrderSchema);

