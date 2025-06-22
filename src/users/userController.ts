import  { Request, Response, NextFunction } from "express";
import User from "./userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

// User Registration Controller
export const userRegister = async (req:Request,res:Response,next:NextFunction)=>{
    const {name, email, password} = req.body;
    
    // Validate the request body
    if(!name || !email || !password){
        const err = createHttpError(400, "All fields are required");
        return next(err);
    }

    // Check if the user already exists
    const user = await User.findOne({
        email:email,
    })

    if(user){
        const err = createHttpError(409, "User already exists");
        return next(err);
    }

    //hash the password
    const hashPassword = await bcrypt.hash(password , 10 );
    // Create a new user
    const newUser = await User.create({
        name:name,
        email:email,
        password:hashPassword,
    })


    // Generate a JWT token
    const token = jwt.sign({sub: newUser._id}, config.jwt_secret as string ,{expiresIn: "2d"});

    if(!newUser){
        const err = createHttpError(500,"user not created");
        return next(err);
    }else{
        res.status(201).json({
            status: "success",
            massage: "user created successfully",
            accessToken: token,
        });
    }

};

// User Login Controller
export const userLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const {email, password} = req.body;

    // Validate the request body
    if(!email || !password){
        const err = createHttpError(400, "All fields are required");
        return next(err);
    }

    // Check if the user exists
    const user = await User.findOne({
        email:email,
    });

    if(!user){
        const err = createHttpError(401, "User not found");
        return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
        // Generate a JWT token
        const token = jwt.sign({sub: user._id}, config.jwt_secret as string ,{expiresIn: "2d"});
        res.status(200).json({
            status: "success",
            message: "user logged in successfully",
            accessToken: token,
        });
    }else{
        const err = createHttpError(401, "Invalid password or username");
        return next(err);
    }

    
}

