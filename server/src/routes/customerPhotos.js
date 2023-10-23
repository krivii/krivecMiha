import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { OrderModel } from "../models/Order.js";
import multer from 'multer';
import  express  from "express";
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { adminAuthorisation } from "../middleware/adminAuthorisation.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()

router.get("/", async (req, res) => {
  try {
      const response = await CustomerPhotoModel.find({});
      res.json(response);
  } catch (error) {
      res.json(error);
  }
});

router.use(adminAuthorisation);

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
      const path = file.path.replace(/\\/g, '/').split('uploads/')[1];
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



router.get("/orderPhotos/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  
  try {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const photos = await CustomerPhotoModel.find({ order: orderId });

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
  const photoId = req.params.photoId;

  try {
    const result = await deletePhoto(photoId);

    if (result === null) {
      res.status(404).json({ message: "Photo not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const deletePath = async (photoId) => {
  try {
    const photoToDelete = await CustomerPhotoModel.findById(photoId);

    if (!photoToDelete) {
      return null; 
    }
  
    const filePath = path.join(process.env.SRC_PATH, "/uploads/", photoToDelete.path);

    const dirPath = path.dirname(filePath);
    

    await fs.promises.unlink(filePath);
      
    const files = await fs.promises.readdir(dirPath);
    if (files.length === 0) {
      await fs.promises.rmdir(dirPath);
    }

    return { message: "Path deleted successfully", photoToDelete };
  } catch (error) {
    console.log("V cem je probelm", error)
    throw error; 
  }
};



router.post("/deleteMany", async (req, res) => {
  const { photoIds } = req.body;
  try {
    if (!Array.isArray(photoIds) || photoIds.length === 0) {

      return res.status(400).json({ message: "Invalid or empty photo IDs provided" });
    }

    photoIds.map(async (photoId) => {
      try {

        await deletePath(photoId);
        return;
      } catch (error) {
        if (error.code === 'EPERM') {
          console.log(error)
          return res.status(200);
        } else {
          console.error(`Error deleting photo with ID ${photoId}:`, error);
          return { status: 500, message: "Internal Server Error" };
        } 
      }
    });

    const photoToDelete = await CustomerPhotoModel.findById(photoIds[0]);

    if (!photoToDelete) {
      return null; 
    }

    const oldOrderId = photoToDelete.order;

    const oldOrder = await OrderModel.findById(oldOrderId);

    if (oldOrder) {
      oldOrder.photos = oldOrder.photos.filter((p) => !photoIds.includes(p.toString()));
      await oldOrder.save();
    }

    try {
      await CustomerPhotoModel.deleteMany({ _id: { $in: photoIds } });
    } catch (error) {
      console.error('Error deleting documents:', error);
    }

    res.status(200).json({ message: "Documents deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export {router as customerPhotoRouter};
