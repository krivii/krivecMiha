import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { OrderModel } from "../models/Order.js";

import  express  from "express";


const router = express.Router()

router.post("/", async (req, res) => {
    const photosData = req.body; 
    const { order: orderId } = photosData; 

    try {
        if (!orderId) {
            return res.status(400).json({ error: "order ID is missing." });
        }

        const foundOrder = await OrderModel.findById(orderId);
        if (!foundOrder) {
            return res.status(404).json({ error: "Order not found." });
        }

        const photo = new CustomerPhotoModel(req.body);
        await photo.save();

        foundOrder.photos.push(photo._id);
        await foundOrder.save();
        
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

  router.get("/", async (req, res) => {
    try {
        const response = await CustomerPhotoModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.get("/:photoId", async (req, res) => {
  try {
      const photoId = req.params.photoId;

      const photo = await CustomerPhotoModel.findById(photoId);
      
      if (!photo) {
          return res.status(404).json({ message: "Photo not found" });
      }

      res.status(200).json({ message: "Photo retrieved successfully", photos: photo });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update photo route
router.put("/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const updates = req.body; 

    const existingPhoto = await CustomerPhotoModel.findById(photoId);
    
    if ('order' in updates) {

        const oldOrderId = existingPhoto.order;
        const newOrderId = updates.order;


        const oldOrder = await OrderModel.findById(oldOrderId);
        if (oldOrder) {
         
          oldOrder.photos = oldOrder.photos.filter((p) => p.toString() !== photoId);
          await oldOrder.save();
        }

        const newOrder = await OrderModel.findById(newOrderId);
        if (!newOrder) {
          return res.status(404).json({ message: "New order not found" });
        }

        newOrder.photos.push(photoId);
        await newOrder.save();
    }

    const updatedPhoto = await CustomerPhotoModel.findByIdAndUpdate(photoId, updates, { new: true });

    if (!updatedPhoto) {
      return res.status(404).json({ message: "photo not found" });
    }

    res.status(200).json({ message: "photo updated successfully", updatedPhoto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;

    const photoToDelete = await CustomerPhotoModel.findById(photoId);

    if (!photoToDelete) {
      return res.status(404).json({ message: "photo not found" });
    }
    
    const oldOrderId = photoToDelete.order;

    const oldOrder = await OrderModel.findById(oldOrderId);
    if (oldOrder) {
     
      oldOrder.photos = oldOrder.photos.filter((p) => p.toString() !== photoId);
      await oldOrder.save();
    }

    await photoToDelete.deleteOne();

    res.status(200).json({ message: "photo deleted successfully", photoToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export {router as customerPhotoRouter};
