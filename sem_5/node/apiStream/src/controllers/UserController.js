import UserService from "../services/UserService.js";

export default class UserController{
    async getUsers(req, res){
        const userService = new UserService();
        res.json(await userService.get());
        // res.send('list Users');
    }

    async getUser(req, res){
    }

    async createUser(req, res){
    }

    async updateUser(req, res){
    }

    async deleteUser(req, res){
    }
}