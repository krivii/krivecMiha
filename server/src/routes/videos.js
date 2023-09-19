import { VideoModel } from "../models/Videos.js";

import  express  from "express";


const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const response = await VideoModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", async (req, res) => {
    try {

        const video = new VideoModel(req.body);
        await video.save();
        res.json(video);

    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});


export {router as videoRouter};
