import UserService from "../services/UserService.js";
import * as status from "../constantes/httpStatus.js";
// import { emailValidatorProxy } from '../utils/emailValidatorProxy.js';  // Importer le proxy

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
            // console.log(hashedPassword.length);
            
            // On passe l'email et le nom à travers le proxy
            // emailValidatorProxy.email = data.email;  // Validation de l'email via le proxy

            // Si l'email est valide, on continue à créer l'utilisateur
            const user = await this.userService.create(data);
            res.status(status.HTTP_200_OK).json(user);
        } catch (error) {
            // Si une erreur de validation d'email survient
            res.status(400).json({ message: error.message });
        }
    }


    // async createUser(req, res){
    //     const { data } = req.body;
    //     try {
    //         const user = await this.userService.createUser(
    //             data.email,
    //             data.name
    //         );
    //         res.json(user).status(status.HTTP_200_OK);
    //     } catch (error) {
            
    //     }
    // }

    async updateUser(req, res) {
        const { id } = req.params;
        const { data } = req.body;
        try {
            const updatedUser = await this.userService.updateUser(parseInt(id), data);
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
            const deleted = await this.userService.deleteUser(parseInt(id));
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