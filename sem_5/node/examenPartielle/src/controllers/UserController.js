import UserService from "../services/UserService.js";
import * as status from "../constantes/httpStatus.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export default class UserController{

    userService;

    constructor(){
        // initialize user service here
        this.userService = new UserService();
    }
    async getUsers(req, res){
        try {
            res.json(await this.userService.getAll()).status(status.HTTP_200_OK);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
        // res.send('list Users');
    }

    async getUser(req, res){
        const { id } = req.params;
        console.log(id);
        
        try {
            res.json(await this.userService.get_user(parseInt(id))).status(200);
        } catch (error) {
            console.error(error);
            res.status(500).json();
        }
    }

    
    

    // Fonction pour créer l'utilisateur avec validation de l'email
    async createUser(req, res) {
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



    async updateUser(req, res) {
        const { id } = req.params;
        const data = req.body;
        
        try {
            const updatedUser = await this.userService.update(parseInt(id), data);
            if (updatedUser) {
                res.status(status.HTTP_200_OK).json(updatedUser);
            } else {
                res.status(status.HTTP_404_NOT_FOUND).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.userService.delete(parseInt(id));
            console.log(deleted.success);
            
            if (deleted) {
                res.status(status.HTTP_204_NO_CONTENT).send();
            } else {
                res.status(status.HTTP_404_NOT_FOUND).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }
}