import jwt from "jsonwebtoken";

import { UserModel } from "../models/Users.js";

const authorization = async (req, res, next) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json({ error: "Token required." });
    }

    const token = authorization.split(" ")[1];


    try {

        const { _id, role } = jwt.verify(token, process.env.SECRET);

        req.user = await UserModel.findOne({ _id }).select('_id');

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Request not authorized." });
    }
}

export { authorization };