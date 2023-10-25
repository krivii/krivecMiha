//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import  express  from "express";

import { FaqModel } from "../models/FAQs.js";
import { adminAuthorisation } from "../middleware/adminAuthorisation.js";



const router = express.Router();

router.get("/", async (req, res) => {
  try {
      const response = await FaqModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.json(error);
  }
});

router.use(adminAuthorisation);

router.put("/", async (req, res) => {
    const newBatch = req.body;
  
    try {

      await FaqModel.deleteMany({});
  

      const newFAQs = newBatch.map((item) => ({
        question: item.question,
        answer: item.answer,
      }));
  

      await FaqModel.insertMany(newFAQs);
  
      res.status(200).json({ message: "FAQs updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating FAQs" });
    }
  });
  

  


  export { router as FaqRouter };