import  express  from "express";
import { CategoryModel } from "../models/Categories.js";
import { PromoPhotoModel } from "../models/PromoPhotos.js";
import {authorization} from "../middleware/authorization.js";

const router = express.Router();

router.use(authorization);


// CATEGORY ROUTES


router.post("/", async (req, res) => {
  try {

    const category = new CategoryModel(req.body);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
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


router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body; 

    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, updates, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

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

    // Remove all photos associated with this category
    await PromoPhotoModel.deleteMany({ _id: { $in: categoryToDelete.photos } });

    await categoryToDelete.deleteOne();

    res.status(200).json({ message: "category deleted successfully", categoryToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




export {router as categoryRouter};


