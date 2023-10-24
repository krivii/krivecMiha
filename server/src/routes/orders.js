import  express  from "express";
import path from 'path'; 
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import dotenv from 'dotenv';
import multer from 'multer';
import { OrderModel } from "../models/Order.js";
import { UserModel } from "../models/Users.js"; 
import { CustomerPhotoModel } from "../models/CustomerPhotos.js";
import { adminAuthorisation } from "../middleware/adminAuthorisation.js";
import { authorization } from "../middleware/authorization.js";



const router = express.Router();


router.use(authorization);

router.get('/zip', (req, res) => {

  const filePath = path.join(process.env.SRC_PATH,'uploads/zips/sample.zip');
  const fileName = 'sampleDOWNLOAD.zip';
  // path.join(process.env.SRC_PATH, "/uploads/", photoToDelete.path);
  // const filePath = path.join(__dirname, 'uploads/zip/something.zip'); // Adjust the file path as needed

  res.download(filePath, fileName, (err) => {
      if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading the file.');
      }
  });

  // console.log("Prisel v klic GET")
});



router.get("/userOrders", async (req, res) => {
  
  const userId = req.user._id;
  
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;

    const orders = await OrderModel.find({ orderOwner: userEmail });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.use(adminAuthorisation);



const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const orderId = req.body.order;
    const uploadPath = path.join(process.env.SRC_PATH, `/uploads/zips/orderid=${orderId}`);
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const zipName = req.body.zipName;
    // const uniqueId = uuidv4(); // Generate a unique identifier
    const Filename = `${zipName}.zip`;
    
    cb(null, Filename);
  },
});

const upload = multer({ storage });

router.put('/zip', upload.array('zip', 1), async (req, res) => {

  const orderId = req.body.order;
  const zipName = req.body.zipName;
  const zipFile = req.files[0]; // Assuming only one zip file is uploaded

  try {
    const foundOrder = await OrderModel.findById(orderId);

    if (!foundOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Save the zip file to the specified directory with the custom filename
    const zipFilePath = zipFile.path.replace(/\\/g, '/').split('uploads/')[1];

    // Check if the found order already has a zip and delete it
    if (foundOrder.zip) {
      const zipFilePathToDelete = path.join(process.env.SRC_PATH, 'uploads', foundOrder.zip);
      deleteExistingZipFile(zipFilePathToDelete);
    }

    // Update the order's 'zip' attribute to store the path of the saved zip file
    foundOrder.zip = zipFilePath;
    await foundOrder.save();

    res.status(200).json({ msg: "Zip folder uploaded successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

const deleteExistingZipFile = (zipFilePath) => {
  fs.unlink(zipFilePath, (err) => {
    if (err) {
      console.error("Error deleting existing zip file:", err);
    } else {
      const directoryPath = path.dirname(zipFilePath);
      fs.readdir(directoryPath, (error, files) => {
        if (!error && files.length === 0) {
          fs.rmdir(directoryPath, (rmdirError) => {
            if (rmdirError) {
              console.error("Error deleting empty directory:", rmdirError);
            }
          });
        }
      });
    }
  });
};




router.post("/", async (req, res) => {
  const orderData = req.body;
  const { orderOwner, name  } = orderData; 
 
  try {
    const user = await UserModel.findOne({ email: orderOwner });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingOrder = await OrderModel.findOne({ name });

    if (existingOrder) {
      return res.status(400).json({ error: "Order name already in use." });
    }

    const order = new OrderModel(req.body);
    console.log(order);
    
    await order.save();

    user.orders.push(order._id);


    await user.save();

    res.json(order);
  } catch (error) {
    console.log(error)
    res.status(555).json({ error: error });
  }
});




router.get("/", async (req, res) => {
  try {
      const response = await OrderModel.find({});
      res.status(200).json(response);
  } catch (error) {
      res.status(400).json(error);
  }
});



router.get("/userOrders/:userId", async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userEmail = user.email;

    const orders = await OrderModel.find({ orderOwner: userEmail });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


  
  // get photos list
  router.get("/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
  
        const order = await OrderModel.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
  
        res.json({ message: "order retrieved successfully", order });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  // Update order route
  router.put("/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const updates = req.body; 


      const existingOrder = await OrderModel.findById(orderId);     

      const exists = await OrderModel.findOne({ name: existingOrder.name });

      if(exists && exists._id != orderId){
        return res.status(409).json({ message: "Order name already exists." });
      }

      if ('orderOwner' in updates) {

        const oldUserEmail = existingOrder.orderOwner;
        const newUserEmail = updates.orderOwner;

        // Find and update the old order

        const oldUser = await UserModel.findOne({ email: oldUserEmail });

        if (oldUser) {

          oldUser.orders = oldUser.orders.filter((p) => p.toString() !== orderId);
          await oldUser.save();
        }

        const newUser = await UserModel.findOne({ email: newUserEmail });
        if (!newUser) {
          return res.status(404).json({ message: "New user not found" });
        }

        newUser.orders.push(orderId);
        await newUser.save();
      }

      if (updates.status === "completed") {

        await CustomerPhotoModel.deleteMany({ _id: { $in: existingOrder.photos } });
      }
      
  
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updates, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


// Inside your router.delete method
router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Call the deleteOrder function with orderId as a parameter
    const result = await deleteOrder(orderId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.json({ message: result.message, orderToDelete: result.orderToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


  async function deleteOrder(orderId) {
    try {
      const orderToDelete = await OrderModel.findById(orderId);
  
      if (!orderToDelete) {
        return { success: false, message: "order not found" };
      }
      
      const oldUserId = orderToDelete.orderOwner;

      const oldUser = await UserModel.findById(oldUserId);
  
      if (oldUser) {

        oldUser.orders = oldUser.orders.filter((p) => p.toString() !== orderId);
        await oldUser.save();
      }
  
  
      await CustomerPhotoModel.deleteMany({ _id: { $in: orderToDelete.photos } });
  
      await orderToDelete.deleteOne();
  
      return { success: true, message: "order deleted successfully", orderToDelete };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal Server Error" };
    }
  }

 

export {router as orderRouter};
export { deleteOrder };


