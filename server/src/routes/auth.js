import  express  from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

const createJWT = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, {expiresIn: "3d"})
}

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;


    try {
        const user = await UserModel.register(name, email, password);
        
        const token = createJWT( user._id);

        res.status(200).json({ email, token});

    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

router.post("/login", async (req, res) => {
    const {email, password, role} = req.body;

    try {
        const user = await UserModel.login(email,password);
        
        const token = createJWT( user._id);

        res.status(200).json({message: "User registered successfully!",  email, role, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
 
});


export {router as authRouter};