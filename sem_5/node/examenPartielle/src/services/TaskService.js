import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class TaskService {
    
    // Créer une nouvelle tâche
    async create(task_data) {
        try {
            return await prisma.task.create({
                data: task_data,
            });
        } catch (error) {
            throw new Error(`Error creating task: ${error.message}`);
        }
    }

    // Récupérer toutes les Tasks
    async getAllTasks() {
        try {
            return await prisma.task.findMany();
        } catch (error) {
            throw new Error(`Error retrieving tasks: ${error.message}`);
        }
    }

    // Récupérer une Task par ID
    async get_task(id) {
        try {
            const task = await prisma.task.findUnique({
                where: { id: id },
            });
            if (!task) {
                throw new Error("Task not found");
            }
            return task;
        } catch (error) {
            throw new Error(`Error retrieving task: ${error.message}`);
        }
    }

    // Mettre à jour une task par ID
    async update(id, task_data) {
        try {
            const updatedTask = await prisma.task.update({
                where: { id: id },
                data: task_data,
            });
            return updatedTask;
        } catch (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    }

    // Supprimer une Task par ID
    async delete(id) {
        try {
            await prisma.task.delete({
                where: { id: id },
            });
            return { message: "Task deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    }
}
