import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { EventModel } from "../models/Events.js";

import  express  from "express";


const router = express.Router()

router.post("/", async (req, res) => {
    const photosData = req.body; 
    const { event: eventId } = photosData; 

    try {
        if (!eventId) {
            return res.status(400).json({ error: "Event ID is missing." });
        }

        const foundEvent = await EventModel.findById(eventId);
        if (!foundEvent) {
            return res.status(404).json({ error: "Event not found." });
        }

        const photo = new CustomerPhotoModel(req.body);
        await photo.save();

        foundEvent.photos.push(photo._id);
        await foundEvent.save();
        
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

  router.get("/", async (req, res) => {
    try {
        const response = await CustomerPhotoModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
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
    
    if ('event' in updates) {

        const oldEventId = existingPhoto.event;
        const newEventId = updates.event;


        const oldEvent = await EventModel.findById(oldEventId);
        if (oldEvent) {
         
          oldEvent.photos = oldEvent.photos.filter((p) => p.toString() !== photoId);
          await oldEvent.save();
        }

        const newEvent = await EventModel.findById(newEventId);
        if (!newEvent) {
          return res.status(404).json({ message: "New Event not found" });
        }

        newEvent.photos.push(photoId);
        await newEvent.save();
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
  try {
    const photoId = req.params.photoId;

    const photoToDelete = await CustomerPhotoModel.findById(photoId);


    if (!photoToDelete) {
      return res.status(404).json({ message: "photo not found" });
    }

    await photoToDelete.deleteOne();

    res.status(200).json({ message: "photo deleted successfully", photoToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const updateEvent = async function (){

}


export {router as customerPhotoRouter};
