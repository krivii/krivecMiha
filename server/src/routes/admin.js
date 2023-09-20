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

router.get("/users", async (req, res) => {
  try {
      const response = await UserModel.find({});
      res.json(response);
  } catch (error) {
      res.json(error);
  }
});

router.get("/users/:userId", async (req, res) => {
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
router.put("/users/:userId", async (req, res) => {
  try {

    const userId = req.params.userId;
    const updates = req.body; 

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



router.delete("/users/:userId", async (req, res) => {
  try {
      
    const userId = req.params.userId;

    const deletedUser = await UserModel.findById(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove all events associated with this user
    await EventModel.deleteMany({ _id: { $in: deletedUser.events } });

    await deletedUser.deleteOne();

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







  // EVENT ROUTES

router.get("/events", async (req, res) => {
  try {
      const response = await EventModel.find({});
      res.json(response);
  } catch (error) {
      res.json(error);
  }
});

// get photos list
router.get("/events/:eventId", async (req, res) => {
  try {
      const eventId = req.params.eventId;

      const event = await EventModel.findById(eventId);
      
      if (!event) {
          return res.status(404).json({ message: "Event not found" });
      }

      res.json({ message: "Event retrieved successfully", photos: event.photos });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update event route
router.put("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const updates = req.body; 

    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updates, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const eventToDelete = await EventModel.findById(eventId);


    if (!eventToDelete) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove all photos associated with this event
    await CustomerPhotoModel.deleteMany({ _id: { $in: eventToDelete.photos } });

    await eventToDelete.deleteOne();

    res.json({ message: "Event deleted successfully", eventToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




  // CUSTOMER MEDIA ROUTES

  router.get("/cmedia", async (req, res) => {
    try {
        const response = await CustomerPhotoModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.get("/cmedia/:photoId", async (req, res) => {
  try {
      const photoId = req.params.photoId;

      const photo = await CustomerPhotoModel.findById(photoId);
      
      if (!photo) {
          return res.status(404).json({ message: "Photo not found" });
      }

      res.json({ message: "photo retrieved successfully", photos: photo });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update event route
router.put("/cmedia/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const updates = req.body; 

    const updatedPhoto = await CustomerPhotoModel.findByIdAndUpdate(photoId, updates, { new: true });

    if (!updatedPhoto) {
      return res.status(404).json({ message: "photo not found" });
    }

    res.json({ message: "photo updated successfully", updatedPhoto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cmedia/:photoId", async (req, res) => {
  try {
    const photoId = req.params.photoId;

    const photoToDelete = await CustomerPhotoModel.findById(photoId);


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

// Update event route
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





  
export { router as adminRouter };


