import { PromoPhotoModel } from "../models/PromoPhotos.js";
import { CategoryModel } from "../models/Categories.js";
import multer from 'multer';
import  express  from "express";
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const uploadPath = path.join(process.env.SRC_PATH,`/uploads/images/pagesImage`);
    ensureDirectoryExists(uploadPath); 
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const upload = multer({ storage });

router.put("/:photoId", upload.single('photo'), async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const newPath = req.file.path.replace(/\\/g, '/').split('uploads/')[1];

    // Find the old path to delete it
    const oldPhoto = await PromoPhotoModel.findById(photoId);
    if (!oldPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const oldPath = oldPhoto.path;

    // Update the photo's path in the database
    const updatedPhoto = await PromoPhotoModel.findByIdAndUpdate(
      photoId,
      { path: newPath },
      { new: true }
    );

    if (!updatedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.status(200).json({ message: "Photo path updated successfully", updatedPhoto });

    // Delete the old path
    await deletePath(oldPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




router.post("/", async (req, res) => {
  try { 
      const promoPhoto = new PromoPhotoModel(req.body);
      await promoPhoto.save();
      res.status(200).json(promoPhoto);

  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
  }
});


router.get("/", async (req, res) => {
    try {
        const response = await PromoPhotoModel.find({});
        res.status(200).json(response);
    } catch (error) {
        res.json(error);
    }
  });
  
router.get("/:name", async (req, res) => {
  const name = req.params.name;
  try {
      const response = await PromoPhotoModel.findOne({ name: name });
      if (response) {
          res.status(200).json(response);
      } else {
          res.status(404).json({ message: "Document not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
 
  
  router.get("/:photoId", async (req, res) => {
  try {
      const photoId = req.params.photoId;
  
      const photo = await PromoPhotoModel.findById(photoId);
      
      if (!photo) {
          return res.status(404).json({ message: "Photo not found" });
      }
  
      res.status(200).json({ message: "photo retrieved successfully", photos: photo });
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
  });
  
  
  


  
  router.delete("/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;
  
    const photoToDelete = await PromoPhotoModel.findById(photoId);
  
    if (!photoToDelete) {
      return res.status(404).json({ message: "photo not found" });
    }

    const oldCatId = photoToDelete.category;

    const oldCat = await CategoryModel.findById(oldCatId);
    if (oldCat) {
     
        oldCat.photos = oldCat.photos.filter((p) => p.toString() !== photoId);
      await oldCat.save();
    }
  
    await photoToDelete.deleteOne();
  
    res.status(200).json({ message: "photo deleted successfully", photoToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  });

  const deletePath = async (imagePath) => {
    try {
      const filePath = path.join(process.env.SRC_PATH, "/uploads/", imagePath);
  
      await fs.promises.unlink(filePath);
  
      const dirPath = path.dirname(filePath);
      const files = await fs.promises.readdir(dirPath);
  
      if (files.length === 0) {
        await fs.promises.rmdir(dirPath);
      }
  
      return { message: "Path deleted successfully", imagePath };
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, but we can continue.
        return { message: "Path doesn't exist or has already been deleted", imagePath };
      } else {
        // Handle other errors.
        console.error("Error deleting path:", error);
        throw error;
      }
    }
  };
  
  
export {router as PromoPhotoRouter};
