import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "orders"}],
    createdAt: {type: Date, required: true},
    role: {type: String, enum: ["moderator", "admin", "customer"],default: "customer"} 

});



//static signup
UserSchema.statics.register = async function(name, email, password) {

    //validation
    if (!email || !name || !password){

        throw Error('All fields must be filled.');
    }
    if (!validator.isEmail(email)){
        throw Error('Email not valid.');
    }
    // if (!validator.isStrongPassword(password)){
    //     throw Error('Password must be stronger.');
    // }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const currentDate = new Date();

    const newUser = this.create({name, email, password: hashedPassword, createdAt: currentDate,});

    return newUser;
}

//static login
UserSchema.statics.login = async function(email, password) {

    //validation
    if (!email || !password){
        throw Error('All fields must be filled.');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Incorrect email.');
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password.');
    }

    return user;

}

UserSchema.statics.loginadmin = async function (email, password, securityKey) {
    // Validation
    if (!email || !password || !securityKey) {
      throw new Error('All fields must be filled.');
    }

    const user = await this.findOne({ email });
   
    if (!user) {
      throw new Error('Incorrect email.');
    }
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatch) {
      throw new Error('Incorrect password.');
    }
  
    if (user.role !== 'admin') {
      throw new Error('Access denied. User is not an admin.');
    }
  
    if (securityKey !== process.env.ADMIN_LOGIN) {
      throw new Error('Access denied. Invalid security key.');
    }
  
    return user;
  };


export const UserModel = mongoose.model("users", UserSchema);