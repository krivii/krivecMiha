import  express  from "express";

import { OrderModel } from "../models/Order.js";
import { UserModel } from "../models/Users.js"; 
import { CustomerPhotoModel } from "../models/CustomerPhotos.js";




const router = express.Router();

router.post("/", async (req, res) => {
  const orderData = req.body;
  const { orderOwner, name  } = orderData; 
 
  try {
    const user = await UserModel.findOne({ email: orderOwner });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingOrder = await OrderModel.findOne({ name });

    if (existingOrder) {
      return res.status(400).json({ error: "Order name already in use." });
    }

    const order = new OrderModel(req.body);
    console.log(order);
    
    await order.save();

    user.orders.push(order._id);


    await user.save();

    res.json(order);
  } catch (error) {
    console.log(error)
    res.status(555).json({ error: error });
  }
});




router.get("/", async (req, res) => {
  try {
      const response = await OrderModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.status(400).json(error);
  }
});

router.get("/userOrders/:userId", async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;

    const orders = await OrderModel.find({ orderOwner: userEmail });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


  
  // get photos list
  router.get("/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
  
        const order = await OrderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
  
        res.json({ message: "order retrieved successfully", order });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update order route
  router.put("/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const updates = req.body; 


      const existingOrder = await OrderModel.findById(orderId);     

      const exists = await OrderModel.findOne({ name: existingOrder.name });

      if(exists && exists._id != orderId){
        return res.status(409).json({ message: "Order name already exists." });
      }

      if ('orderOwner' in updates) {

        const oldUserEmail = existingOrder.orderOwner;
        const newUserEmail = updates.orderOwner;

        // Find and update the old order

        const oldUser = await UserModel.findOne({ email: oldUserEmail });

        if (oldUser) {

          oldUser.orders = oldUser.orders.filter((p) => p.toString() !== orderId);
          await oldUser.save();
        }

        const newUser = await UserModel.findOne({ email: newUserEmail });
        if (!newUser) {
          return res.status(404).json({ message: "New user not found" });
        }

        newUser.orders.push(orderId);
        await newUser.save();
      }

      if (updates.status === "completed") {

        await CustomerPhotoModel.deleteMany({ _id: { $in: existingOrder.photos } });
      }
      
  
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updates, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


// Inside your router.delete method
router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Call the deleteOrder function with orderId as a parameter
    const result = await deleteOrder(orderId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.json({ message: result.message, orderToDelete: result.orderToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


  async function deleteOrder(orderId) {
    try {
      const orderToDelete = await OrderModel.findById(orderId);
  
      if (!orderToDelete) {
        return { success: false, message: "order not found" };
      }
      
      const oldUserId = orderToDelete.orderOwner;

      const oldUser = await UserModel.findById(oldUserId);
  
      if (oldUser) {

        oldUser.orders = oldUser.orders.filter((p) => p.toString() !== orderId);
        await oldUser.save();
      }
  
  
      await CustomerPhotoModel.deleteMany({ _id: { $in: orderToDelete.photos } });
  
      await orderToDelete.deleteOne();
  
      return { success: true, message: "order deleted successfully", orderToDelete };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal Server Error" };
    }
  }

 

export {router as orderRouter};
export { deleteOrder };

