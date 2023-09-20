import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { EventModel } from "../models/Events.js"; 
import { CustomerPhotoModel } from "../models/CustomerPhotos.js";




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
          return event.status(404).json({ message: "Event not found" });
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




  // CATEGORY ROUTES






  
export { router as adminRouter };


