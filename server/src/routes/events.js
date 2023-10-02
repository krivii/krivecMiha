import  express  from "express";

import { EventModel } from "../models/Events.js";
import { UserModel } from "../models/Users.js"; 
import { CustomerPhotoModel } from "../models/CustomerPhotos.js";




const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
      const response = await EventModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.status(400).json(error);
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

      const existingEvent = await EventModel.findById(eventId);

      if ('eventOwner' in updates) {

        const oldUserId = existingEvent.eventOwner;
        const newUserId = updates.eventOwner;




        // Find and update the old event
        const oldUser = await UserModel.findById(oldUserId);
        if (oldUser) {
          // Remove the eventId from the old event's photos array
          oldUser.events = oldUser.events.filter((p) => p.toString() !== eventId);
          await oldUser.save();
        }

        const newUser = await UserModel.findById(newUserId);
        if (!newUser) {
          return res.status(404).json({ message: "New user not found" });
        }

        newUser.events.push(eventId);
        await newUser.save();
      }
  
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
  


// Inside your router.delete method
router.delete("/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Call the deleteEvent function with eventId as a parameter
    const result = await deleteEvent(eventId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.json({ message: result.message, eventToDelete: result.eventToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


  async function deleteEvent(eventId) {
    try {
      const eventToDelete = await EventModel.findById(eventId);
  
      if (!eventToDelete) {
        return { success: false, message: "Event not found" };
      }
      
      const oldUserId = eventToDelete.eventOwner;

      const oldUser = await UserModel.findById(oldUserId);
  
      if (oldUser) {

        oldUser.events = oldUser.events.filter((p) => p.toString() !== eventId);
        await oldUser.save();
      }
  
  
      await CustomerPhotoModel.deleteMany({ _id: { $in: eventToDelete.photos } });
  
      await eventToDelete.deleteOne();
  
      return { success: true, message: "Event deleted successfully", eventToDelete };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal Server Error" };
    }
  }

 

export {router as eventRouter};
export { deleteEvent };


