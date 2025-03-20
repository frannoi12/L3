"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(data: {
  title: string;
  description: string;
  dueDate: string;
  userId:string
}) {

    try {
        await prisma.task.create({data:{
            title:data.title,
            description:data.description,
            dueDate: new Date(data.dueDate),
            userId:Number(data.userId)
        }
    });
    revalidatePath("/dashboard");
    return {success:true}
    } catch (error) {
        console.log("erreur ")
        return {success:false,message:"erreur lors de la creation"}
        
    }
}



export async function getTasks() {
    try {
      const tasks  = await prisma.task.findMany();
  
      return { success: true, data: tasks };
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
      return { success: false, data: [] };
    }
  }


export async function getTaskById(taskId: number) {
  try {
    return await prisma.task.findUnique({
      where: { id: taskId },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la tâche :", error);
    return null;
  }
}


export async function updateTask(taskId: number, data: { title: string; description: string; dueDate: string; completed: boolean }) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        dueDate: new Date(data.dueDate),
        completed: data.completed,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    return { success: false, message: "Erreur lors de la mise à jour de la tâche." };
  }
}


export async function deleteTask(taskId: string) {
    try {
      await prisma.task.delete({
        where: { id: Number(taskId) },
      });
  
      revalidatePath("/dashboard");
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      return { success: false, message: "Impossible de supprimer la tâche." };
    }
  }

