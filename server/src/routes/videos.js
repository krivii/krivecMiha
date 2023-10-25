//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import  express  from "express";

import { VideoModel } from "../models/Videos.js";
import { adminAuthorisation } from "../middleware/adminAuthorisation.js";



const router = express.Router();


router.get("/", async (req, res) => {
  try {
      const response = await VideoModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.json(error);
  }
});



router.get("/:videoId", async (req, res) => {
try {
    const videoId = req.params.videoId;

    const video = await VideoModel.findById(videoId);
    
    if (!video) {
        return res.status(404).json({ message: "video not found" });
    }

    res.status(200).json({ message: "video retrieved successfully", videos: video });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
}
});

router.use(adminAuthorisation);

router.post("/", async (req, res) => {
    try { 
        const video = new VideoModel(req.body);
        await video.save();
        res.status(200).json(video);
  
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
  });
  




router.put("/:videoId", async (req, res) => {
try {
  const videoId = req.params.videoId;
  const updates = req.body; 

  const updatedVideo = await VideoModel.findByIdAndUpdate(videoId, updates, { new: true });

  if (!updatedVideo) {
    return res.status(404).json({ message: "video not found" });
  }

  res.status(200).json({ message: "video updated successfully", updatedVideo });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
});

router.delete("/:videoId", async (req, res) => {
try {
  const videoId = req.params.videoId;

  const videoToDelete = await VideoModel.findById(videoId);


  if (!videoToDelete) {
    return res.status(404).json({ message: "video not found" });
  }

  await videoToDelete.deleteOne();

  res.status(200).json({ message: "video deleted successfully", videoToDelete });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
}
});

  
export { router as VideoRouter };


