//Spletna aplikacija za fotografe/ Web application for photographers

//Copyright (C) 2023  Luka Krivec (lk2378@student.uni-lj.si). Licensed under the GPL-3.0 or later.

import jwt from "jsonwebtoken";

import { UserModel } from "../models/Users.js";

const adminAuthorisation = async (req, res, next) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json({ error: "Token required." });
    }

    const token = authorization.split(" ")[1];


    try {

        const { _id, role } = jwt.verify(token, process.env.SECRET);


        req.user = await UserModel.findOne({ _id }).select('_id');
        // console.log(userId)
        const user = await UserModel.findOne({ _id });


        if (user.role !== "admin") {
            return res.status(403).json({ error: "Permission denied. Admin access required." });
        } else {
            next();
        }
        


    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Request not authorized." });
    }
}

export { adminAuthorisation };