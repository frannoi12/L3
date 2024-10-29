import UserService from "../services/UserService.js";
import * as status from "../constantes/httpStatus.js";


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

    async createUser(req, res){
        const { data } = req.body;
        try {
            const user = await this.userService.createUser(
                data.email,
                data.name
            );
            res.json(user).status(status.HTTP_200_OK);
        } catch (error) {
            
        }
    }

    async updateUser(req, res){
    }

    async deleteUser(req, res){
    }
}