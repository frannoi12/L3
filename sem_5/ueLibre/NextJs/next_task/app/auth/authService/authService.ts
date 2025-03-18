"use server";

import prisma from "@/lib/prisma";
import bcrypt, { compare } from "bcryptjs";
import { error } from "console";
import { redirect } from "next/navigation";

type AuthResponse = {
    user : {
        id: number;
        name: string;
        email: string;
    }
};

export async function registeruser( formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        console.log("Les champs sont vides");
        return;
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        console.log("L'email existe déjà");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    } as AuthResponse;

}


export async function loginUser(formData : FormData) {

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if(!email || !password) {
        return {
            error: {email:"email est requis", password:"le mot de passe est requis"}
        }
    }

    const user = await prisma.user.findUnique(
        {
            where : {email}
        }
    )

    if(!user || !(await compare(password, user.password))) {
        return {
            error : {general : "l'email ou le mot de passe est incorrect"}
        }
    }

    return {
        user : {id:user.id, name : user.name, email:user.email}
    }


}


export  const   handleLogout =  async () => {
    localStorage.removeItem("user")
    redirect("/auth/login")

}


