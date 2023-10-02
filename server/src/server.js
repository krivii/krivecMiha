import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import { authRouter } from "./routes/auth.js"
import { userRouter } from "./routes/users.js"
import { customerPhotoRouter } from "./routes/customerPhotos.js"
import { PromoPhotoRouter } from "./routes/promoPhotos.js"
import { eventRouter } from "./routes/events.js"
import { categoryRouter } from "./routes/categories.js"
import { VideoRouter } from "./routes/videos.js"

// Load environment variables from the specified path
dotenv.config({ path: '../.env' });

// express app
const app = express();

app.get('/', (req, res) => {
    res.json({ msg: "Welcome to the app" })
})

// middleware
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.use("/admin/user", userRouter);

app.use("/admin/event", eventRouter);
app.use("/admin/cphoto", customerPhotoRouter);

app.use("/admin/category", categoryRouter);
app.use("/admin/pphoto", PromoPhotoRouter);
app.use("/admin/video", VideoRouter);


mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})
