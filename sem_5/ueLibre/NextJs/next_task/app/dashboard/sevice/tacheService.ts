"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default  async function createTask(data: {
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