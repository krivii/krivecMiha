import  express  from "express";

import { FaqModel } from "../models/FAQs.js";

const router = express.Router();

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
  

  
  router.get("/", async (req, res) => {
    try {
        const response = await FaqModel.find({});
        res.status(200).json(response);
    } catch (error) {
        res.json(error);
    }
  });

  export { router as FaqRouter };