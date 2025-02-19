import TaskService from "../services/TaskService.js";
import * as statues from "../constantes/httpStatus.js";

export default class TaskController {
    taskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async getTasks(req, res) {
        try {
            const tasks = await this.taskService.getAllTasks();  
            res.status(statues.HTTP_200_OK).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving tasks" });
        }
    }

    async getTask(req, res) {
        const { id } = req.params;
        try {
            const task = await this.taskService.get_task(parseInt(id));  
            if (task) {
                res.status(statues.HTTP_200_OK).json(task);
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Task not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving task" });
        }
    }

    async createTask(req, res) {
        console.log(req.body);
        
        const { title, description, completed, userId } = req.body; 
        try {
            const newTask = await this.taskService.create({
                title,
                description,
                completed,
                user: { connect: { id: userId } }, 
            });
            res.status(201).json(newTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating task" });
        }
    }

    async updateTask(req, res) {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        try {
            const updatedTask = await this.taskService.update(parseInt(id), { title, description, completed });
            if (updatedTask) {
                res.status(statues.HTTP_200_OK).json(updatedTask);
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Task not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error updating task" });
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.taskService.delete(parseInt(id));
            if (deleted) {
                res.status(statues.HTTP_204_NO_CONTENT).send();
            } else {
                res.status(statues.HTTP_404_NOT_FOUND).json({ message: "Task not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(statues.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error deleting task" });
        }
    }
}
