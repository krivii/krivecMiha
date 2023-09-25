import  express  from "express";
import mongoose from "mongoose";

import { CategoryModel } from "../models/Categories.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await CategoryModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});


router.post("/", async (req, res) => {
  const eventData = req.body; 
  try {

    const event = new CategoryModel(req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});


export {router as categoryRouter};


