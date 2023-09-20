import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { EventModel } from "../models/Events.js";

import  express  from "express";
import mongoose from "mongoose";


const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const response = await CustomerPhotoModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

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
        res.json(photo);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});


export {router as customerPhotoRouter};
