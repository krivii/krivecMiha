import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";




const router = express.Router();

router.get("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
  
        // Find the user by ID
        const user = await UserModel.findById(userId);
  
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
  
        res.json({ message: "User retrieved successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



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

// Update user route
router.put("/users/:userId", async (req, res) => {
    try {
    console.log("User found in the database:", user);
      const userId = req.params.userId;
      const updates = req.body; 
  
      // Find the user by ID and update their information
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  export { router as adminRouter };


