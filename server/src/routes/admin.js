import  express  from "express";
import mongoose from "mongoose";

import { CategoryModel } from "../models/Categories.js";
import { UserModel } from "../models/Users.js";




const router = express.Router();


router.delete("/users/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user by ID and delete it
      const deletedUser = await UserModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export {router as adminRouter};


