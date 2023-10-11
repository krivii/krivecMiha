import  express  from "express";
import { CategoryModel } from "../models/Categories.js";
import { PromoPhotoModel } from "../models/PromoPhotos.js";
import {authorization} from "../middleware/authorization.js";
import multer from 'multer';
import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';


const router = express.Router();


// router.use(authorization);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const name = req.body.name.replace(/\s/g, "");

    const uploadPath = path.join(process.env.SRC_PATH,`/uploads/images/categoryName=${name}`);
    ensureDirectoryExists(uploadPath); 
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.array('images', 50), async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const files = req.files;
  const photos = [];
  

  for (const file of files) {
    const path = file.path.replace(/\\/g, '/').split('uploads/')[1];
    photos.push(path);
  };

  const cover = photos[0];

  try {
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      res.status(409).json({ error: "Category with the same name already exists." });
      return;
    }
    const category = new CategoryModel({ name, description, photos, cover });
    await category.save();
    res.status(200).json(category);
} catch (error) {
    if (error.code !== 11000) {

        throw error;
    
    } else{
      res.status(200).json({msg: "Soul goodman."});
    }
}
  
});

router.get("/", async (req, res) => {
  try {
      const response = await CategoryModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.json(error);
  }
});




// get photos list
router.get("/:categoryId", async (req, res) => {
  try {
      const categoryId = req.params.categoryId;

      const category = await CategoryModel.findById(categoryId);
      
      if (!category) {
          return res.status(404).json({ message: "category not found" });
      }

      res.status(200).json({ message: "category retrieved successfully",  category});

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/:categoryId", upload.array('images', 50), async (req, res) => {
  const categoryId = req.params.categoryId;
  const files = req.files;
  const photos = [];

  for (const file of files) {
    const filePath = file.path.replace(/\\/g, '/').split('uploads/')[1];
    photos.push(filePath);
  }

  try {
    const existingCategory = await CategoryModel.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Add the new photos to the existing photos array
    existingCategory.photos.push(...photos);

    const updatedCategory = await existingCategory.save();

    res.status(200).json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const categoryToDelete = await CategoryModel.findById(categoryId);


    if (!categoryToDelete) {
      return res.status(404).json({ message: "category not found" });
    }

    const images = categoryToDelete.photos;

    images.map(async (image) => {
      try {

        await deletePath(image);
        return;
      } catch (error) {
        if (error.code === 'EPERM') {
          console.log(error)
          return res.status(200);
        } else {
          console.error(`Error deleting image ${image}:`, error);
          return { status: 500, message: "Internal Server Error" };
        } 
      }
    });


    await categoryToDelete.deleteOne();

    res.status(200).json({ message: "category deleted successfully", categoryToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deletePath = async (imagePath) => {
  try {
  
    const filePath = path.join(process.env.SRC_PATH, "/uploads/", imagePath);

    const dirPath = path.dirname(filePath);

    await fs.promises.unlink(filePath);
      
    const files = await fs.promises.readdir(dirPath);
    if (files.length === 0) {
      await fs.promises.rmdir(dirPath);
    }

    return { message: "Path deleted successfully", imagePath };
  } catch (error) {
    console.log("V cem je probelm", error)
    throw error; 
  }
};




export {router as categoryRouter};


