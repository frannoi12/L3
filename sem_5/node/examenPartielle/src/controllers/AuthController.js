// import express from "express";

import UserService from "../services/UserService.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

export default class AuthController{

    userService;

    constructor(){
        // initialize user service here
        this.userService = new UserService();
    }

    
   async register(req,res) {
        const data = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            const user = await this.userService.create(data);
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }  

    async login(req,res) {
        const {email,password} = req.body;
        // res.send("login");
        try {
            const user = await this.userService.findByEmail(email);
            // console.log(user);

            if(!user){
                return res.status(404).json({ message: "Invalid email or password" });
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);

            // console.log(isValidPassword);
            

            if (!isValidPassword) {
                return res.status(401).json({ message: "Invalid email or password" });
            }


            const payload = { 
                id: user.id,
                name : user.name,
                email : user.email,
            }


            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while trying to login" });
        }
    }
}