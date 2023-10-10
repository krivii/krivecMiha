import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { OrderModel } from "../models/Order.js";
import multer from 'multer';
import  express  from "express";
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const orderId = req.body.order; 
    const uploadPath = path.join(process.env.SRC_PATH,`/uploads/images/orderid=${orderId}`);
    ensureDirectoryExists(uploadPath); 
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {


    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.array('photos', 100), async (req, res) => {
  const orderId = req.body.order;
  const files = req.files;

  try {
    const foundOrder = await OrderModel.findById(orderId);

    if (!foundOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    for (const file of files) {
      const path = file.path;
      const photoData = {
          path: path,
          order: orderId,
      };

      try {
         const photo = new CustomerPhotoModel(photoData);
          await photo.save();
          foundOrder.photos.push(photo._id);
      } catch (error) {
          if (error.code !== 11000) {

              throw error;
          }

      }
  }

    await foundOrder.save();
      
      res.status(200).json({msg: "Soul goodman."});
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

router.get("/orderPhotos/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  
  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const photos = await CustomerPhotoModel.find({ order: orderId });
    console.log(photos)
    res.status(200).json(photos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
