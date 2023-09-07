import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import {userRouter} from "./routes/users.js"


dotenv.config();

// express app
const app = express();

app.get('/', (req, res) =>{
    res.json({msg: "Welcome to the app"})

})

// middleware
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
    "mongodb+srv://krivecluka:6g8Ag6iYxpmFsQh3@media.hmgqya1.mongodb.net/media?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})






