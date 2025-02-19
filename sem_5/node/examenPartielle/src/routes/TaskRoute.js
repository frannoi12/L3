import express from "express";
import TaskController from "../controllers/TaskController.js";

export default class TasksRouter {

    router;
    taskController;
    
    constructor() {
        this.router = express.Router();
        this.taskController = new TaskController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.taskController.getTasks.bind(this.taskController));
        this.router.get('/:id', this.taskController.getTask.bind(this.taskController));
        this.router.post('/create', this.taskController.createTask.bind(this.taskController));
        this.router.put('/update/:id', this.taskController.updateTask.bind(this.taskController));
        this.router.delete('/delete/:id', this.taskController.deleteTask.bind(this.taskController));
    }

    getRouter() {
        return this.router;
    }
}
