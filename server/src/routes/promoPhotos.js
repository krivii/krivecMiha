import { PromoPhotoModel } from "../models/PromoPhotos.js";
import { CategoryModel } from "../models/Categories.js";
import multer from 'multer';

// Your code here...


import  express  from "express";


const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const orderId = req.body.order; // Assuming the order ID is included in the request body
    const uploadPath = path.join(__dirname, `../uploads/images/orderid=${orderId}`);
    cb(null, uploadPath); // Set the upload directory based on the order ID
  },
  filename: (req, file, cb) => {
    // Use the original filename (you can modify this as needed)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.array('photos', 100), async (req, res) => {
  const photosData = req.body;
  const { category: categoryId } = photosData;

  try {
    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is missing.' });
    }

    // Find the category by ID (assuming you have a Category model)
    const foundCategory = await CategoryModel.findById(categoryId);

    if (!foundCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Create and save a new PromoPhoto document (assuming you have a PromoPhoto model)
    const photo = new PromoPhotoModel({
      ...photosData,
      path: req.files.map((file) => file.path), // Store file paths in the database
    });

    await photo.save();

    // Add the photo to the category's photos array
    foundCategory.photos.push(photo._id);

    await foundCategory.save();

    res.status(200).json(photo);
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ error: 'Internal server error.' });
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
  
  
  router.put("/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const updates = req.body; 

    const existingPhoto = await PromoPhotoModel.findById(photoId);

    if ('category' in updates) {

        const oldCatId = existingPhoto.category;
        const newCatId = updates.category;

        const oldCat = await CategoryModel.findById(oldCatId);
        if (oldCat) {
         
            oldCat.photos = oldCat.photos.filter((p) => p.toString() !== photoId);
          await oldCat.save();
        }

        const newCat = await CategoryModel.findById(newCatId);
        if (!newCat) {
          return res.status(404).json({ message: "New category not found" });
        }

        newCat.photos.push(photoId);
        await newCat.save();
      }
  
    const updatedPhoto = await PromoPhotoModel.findByIdAndUpdate(photoId, updates, { new: true });
  
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
  
export {router as PromoPhotoRouter};
