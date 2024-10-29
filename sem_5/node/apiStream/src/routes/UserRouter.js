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
        this.router.get('/:id', this.userController.getUser.bind(this.userController));
        this.router.post('/create', this.userController.createUser.bind(this.userController));
        this.router.put('/update/id', this.userController.updateUser.bind(this.userController));
        this.router.delete('/delate/id', this.userController.deleteUser.bind(this.userController));
    }

    getRouter() {
        return this.router;
    }
}