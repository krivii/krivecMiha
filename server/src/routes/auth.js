import  express  from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await UserModel.register(name, email,password);
        res.status(200).json({message: "User registered successfully!", user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message: "User doesn't exists!"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message: "Incorrect password."});
    }
    const token = jwt.sign({id: user._id}, "secret");
    res.json({message: "Successfull login.", token, userID: user._id});

});


export {router as authRouter};