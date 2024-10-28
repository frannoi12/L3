import e from "express";
import UserController from "../controllers/UserController.js";

export default class UserRouter {
    router;
    userController;

    constructor() {
        this.router = e.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.userController.getUsers.bind(this.userController));
        // this.router.get('/users/:id', this.UserController.getUser);
        // this.router.post('/users', this.UserController.createUser);
        // this.router.put('/users/:id', this.UserController.updateUser);
        // this.router.delete('/users/:id', this.UserController.deleteUser);
    }

    getRouter() {
        return this.router;
    }
}