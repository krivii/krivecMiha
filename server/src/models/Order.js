//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    orderOwner: { type: String, required: true}, 
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "customerPhotos" }],
    status: {
      type: String,
      required: true,
      enum: ["active", "completed", "pending"],
      default: "active",
    },
    date: { type: Date, required: true },
    zip: { type: String},
  });
  




export const OrderModel = mongoose.model("Order", OrderSchema);

