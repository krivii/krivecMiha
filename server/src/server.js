import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';



import { authRouter } from "./routes/auth.js"
import { userRouter } from "./routes/users.js"
import { customerPhotoRouter } from "./routes/customerPhotos.js"
import { PromoPhotoRouter } from "./routes/promoPhotos.js"
import { orderRouter } from "./routes/orders.js"
import { categoryRouter } from "./routes/categories.js"
import { VideoRouter } from "./routes/videos.js"
import { authorization} from "./middleware/authorization.js";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FaqRouter } from "./routes/faqs.js";

const __dirname = dirname(fileURLToPath(import.meta.url));


// Load environment variables from the specified path
dotenv.config({ path: '../.env' });

// express app
const app = express();



app.get('/', (req, res) => {
    res.json({ msg: "Welcome to the app" })
})

// middleware
app.use(express.static('src/uploads'));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/admin/user",  userRouter);
app.use("/api/admin/order",  orderRouter);
app.use("/api/admin/cphoto", customerPhotoRouter);
app.use("/api/admin/category", categoryRouter);
app.use("/api/admin/pphoto",  PromoPhotoRouter);
app.use("/api/admin/video", VideoRouter);
app.use("/api/admin/faq", FaqRouter);
// app.use(authorization);

// // Middleware to check if the user is an admin
// const checkAdminAccess = (req, res, next) => {
//   // console.log(req.isAdmin)
//   if (req.isAdmin) {    
//     next();
//   } else {
//     res.status(403).json({ error: "Permission denied. Admin access required." });
//   }
// };

// // // Routes restricted to admin users
// app.use("/api/admin/user", checkAdminAccess, userRouter);
// app.use("/api/admin/order", checkAdminAccess, orderRouter);
// app.use("/api/admin/cphoto", checkAdminAccess, customerPhotoRouter);
// app.use("/api/admin/category", checkAdminAccess, categoryRouter);
// app.use("/api/admin/pphoto", checkAdminAccess, PromoPhotoRouter);
// app.use("/api/admin/video", checkAdminAccess, VideoRouter);



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
