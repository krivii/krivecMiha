import  express  from "express";
import { UserModel } from "../models/Users.js";
import { OrderModel  } from "../models/Order.js";
import { deleteOrder } from "./orders.js"; 

const router = express.Router()
// TODO SEARCH BY KEYWORD OPTION

router.get("/", async (req, res) => {
    try {
        const response = await UserModel.find({});
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
  });
  
  router.get("/:userId", async (req, res) => {
      try {
          const userId = req.params.userId;
  
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
  
  // Update user route

  //TODO PSW CHANGE
  router.put("/:userId", async (req, res) => {
    try {
       
      const userId = req.params.userId;
      const userEmail = req.body.email;

      const updates = req.body;

      const exists = await UserModel.findOne({ email: userEmail });

      if(exists && exists._id != userId){
        return res.status(409).json({ message: "Email already exists." });
      }
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
  
  
  
  router.delete("/:userId", async (req, res) => {
    try {
        
      const userId = req.params.userId;
  
      const deletedUser = await UserModel.findById(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      for (const orderId of deletedUser.orders) {
        const result = await deleteOrder(orderId);
        if (!result.success) {
          console.error(`Failed to delete order with ID ${orderId}`);
        }
      }

    await deletedUser.deleteOne();

    res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export {router as userRouter};