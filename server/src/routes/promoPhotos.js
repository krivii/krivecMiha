import { PromoPhotoModel } from "../models/PromoPhotos.js";
import { CategoryModel } from "../models/Categories.js";

import  express  from "express";
import mongoose from "mongoose";


const router = express.Router()


router.get("/", async (req, res) => {
    try {
        const response = await PromoPhotoModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", async (req, res) => {
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


export {router as promoPhotoRouter};
