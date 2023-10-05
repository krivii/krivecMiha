import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: "events"}],
    role: {type: String, default: "customer"} 
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

    const newUser = this.create({name, email, password: hashedPassword});

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


export const UserModel = mongoose.model("users", UserSchema);