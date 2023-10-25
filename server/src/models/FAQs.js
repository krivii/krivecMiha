//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer:{type: String, required: true}

});

export const FaqModel = mongoose.model("faqs", FaqSchema);