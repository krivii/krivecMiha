//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import  express  from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

const createJWT = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "1d" });
}

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;


    try {
        const user = await UserModel.register(name, email, password);
        
        const token = createJWT(user._id, user.role);


        res.status(200).json({ message: "User registered successfully!", role: user.role, token, name });
    

    } catch (error) {
        res.status(400).json({error: error.message});
    }

});

router.post("/login", async (req, res) => {
    const {email, password, role} = req.body;

    try {
        const user = await UserModel.login(email,password);
        const name = user.name;

        const token = createJWT(user._id, user.role);

        res.status(200).json({ message: "User logged in successfully!", role: user.role, token, name });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
 
});

router.post("/adminLogin", async (req, res) => {
    const { email, password, securityKey } = req.body;

  
    try {
      const user = await UserModel.loginadmin(email, password, securityKey);
      const name = user.name;
      const userId = user._id;
      const token = createJWT(user._id, user.role);
  
      res.status(200).json({ message: "Admin logged in successfully!", role: user.role, token, name });
    } catch (error) {

      res.status(400).json({ error: error.message });
    }
});


export {router as authRouter};