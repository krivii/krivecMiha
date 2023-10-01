import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { EventModel } from "../models/Events.js"; 
import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { CategoryModel } from "../models/Categories.js";
import { PromoPhotoModel } from "../models/PromoPhotos.js";
import { VideoModel } from "../models/Videos.js";




const router = express.Router();


// USER ROUTES

// TODO SEARCH BY KEYWORD OPTION










// CATEGORY ROUTES

router.get("/categories", async (req, res) => {
  try {
      const response = await CategoryModel.find({});
      res.json(response);
  } catch (error) {
      res.json(error);
  }
});

// get photos list
router.get("/categories/:categoryId", async (req, res) => {
  try {
      const categoryId = req.params.categoryId;

      const category = await CategoryModel.findById(categoryId);
      
      if (!category) {
          return res.status(404).json({ message: "category not found" });
      }

      res.json({ message: "category retrieved successfully", photos: category.photos });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body; 

    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, updates, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const categoryToDelete = await CategoryModel.findById(categoryId);


    if (!categoryToDelete) {
      return res.status(404).json({ message: "category not found" });
    }

    // Remove all photos associated with this event
    await PromoPhotoModel.deleteMany({ _id: { $in: categoryToDelete.photos } });

    await categoryToDelete.deleteOne();

    res.json({ message: "category deleted successfully", categoryToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







// promo photos route
router.get("/photos", async (req, res) => {
  try {
      const response = await PromoPhotoModel.find({});
      res.json(response);
  } catch (error) {
      res.json(error);
  }
});

router.post("/photos", async (req, res) => {
  const photosData = req.body; 
  const { category: categoryId } = photosData; 
  
  try {

      if (!categoryId) {
          return res.status(400).json({ error: "Category ID is missing." });
      }
      
      const foundCategory = await CategoryModel.findById(categoryId);            
      const photo = new PromoPhotoModel(req.body);

      await photo.save();

      foundCategory.photos.push(photo._id);

      await foundCategory.save();
      res.json(photo);

  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
  }
});


router.get("/photos/:photoId", async (req, res) => {
try {
    const photoId = req.params.photoId;

    const photo = await PromoPhotoModel.findById(photoId);
    
    if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
    }

    res.json({ message: "photo retrieved successfully", photos: photo });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
}
});


router.put("/photos/:photoId", async (req, res) => {
try {
  const photoId = req.params.photoId;
  const updates = req.body; 

  const updatedPhoto = await PromoPhotoModel.findByIdAndUpdate(photoId, updates, { new: true });

  if (!updatedPhoto) {
    return res.status(404).json({ message: "photo not found" });
  }

  res.json({ message: "photo updated successfully", updatedPhoto });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
});

router.delete("/photos/:photoId", async (req, res) => {
try {
  const photoId = req.params.photoId;

  const photoToDelete = await PromoPhotoModel.findById(photoId);


  if (!photoToDelete) {
    return res.status(404).json({ message: "photo not found" });
  }

  await photoToDelete.deleteOne();

  res.json({ message: "photo deleted successfully", photoToDelete });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
});




//video route

router.get("/videos", async (req, res) => {
  try {
      const response = await VideoModel.find({});
      res.json(response);
  } catch (error) {
      res.json(error);
  }
});


router.post("/videos", async (req, res) => {
  try { 
      const video = new VideoModel(req.body);
      await video.save();
      res.json(video);

  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
  }
});


router.get("/videos/:videoId", async (req, res) => {
try {
    const videoId = req.params.videoId;

    const video = await VideoModel.findById(videoId);
    
    if (!video) {
        return res.status(404).json({ message: "video not found" });
    }

    res.json({ message: "video retrieved successfully", videos: video });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
}
});


router.put("/videos/:videoId", async (req, res) => {
try {
  const videoId = req.params.videoId;
  const updates = req.body; 

  const updatedVideo = await VideoModel.findByIdAndUpdate(videoId, updates, { new: true });

  if (!updatedVideo) {
    return res.status(404).json({ message: "video not found" });
  }

  res.json({ message: "video updated successfully", updatedVideo });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
});

router.delete("/videos/:videoId", async (req, res) => {
try {
  const videoId = req.params.videoId;

  const videoToDelete = await VideoModel.findById(videoId);


  if (!videoToDelete) {
    return res.status(404).json({ message: "video not found" });
  }

  await videoToDelete.deleteOne();

  res.json({ message: "video deleted successfully", videoToDelete });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
});

  
export { router as adminRouter };


