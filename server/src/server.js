import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import { userRouter } from "./routes/users.js"
import { customerPhotoRouter } from "./routes/customerPhotos.js"
import { eventRouter } from "./routes/events.js"
import { categoryRouter } from "./routes/categories.js"
import { adminRouter } from "./routes/admin.js"


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

app.use("/admin", adminRouter);
app.use("/auth", userRouter);
app.use("/cmedia", customerPhotoRouter);
app.use("/event", eventRouter);
app.use("/category", categoryRouter);


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
