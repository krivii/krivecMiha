import  express  from "express";

import { EventModel } from "../models/Events.js";
import { UserModel } from "../models/Users.js"; 
import { CustomerPhotoModel } from "../models/CustomerPhotos.js";




const router = express.Router();

router.get("/", async (req, res) => {
  try {
      const response = await EventModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.status(400).json(error);
  }
});


router.post("/", async (req, res) => {
  const eventData = req.body; 
  const { eventOwner } = eventData; 


  try {

    const user = await UserModel.findOne({ _id: eventOwner });


    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }


    const event = new EventModel(req.body);
    await event.save();

    user.events.push(event._id);

    await user.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});


  
  // get photos list
  router.get("/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId;
  
        const event = await EventModel.findById(eventId);
        
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
  
        res.json({ message: "Event retrieved successfully", event });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update event route
  router.put("/:eventId", async (req, res) => {
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
  
  
  router.delete("/:eventId", async (req, res) => {
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


export {router as eventRouter};


