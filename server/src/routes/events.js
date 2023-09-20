import  express  from "express";
import mongoose from "mongoose";

import { EventModel } from "../models/Events.js";
import { UserModel } from "../models/Users.js"; 




const router = express.Router();


router.post("/", async (req, res) => {
  const eventData = req.body; 
  const { eventOwner } = eventData; 

  try {

    const user = await UserModel.findOne({ username: eventOwner });

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


export {router as eventRouter};


