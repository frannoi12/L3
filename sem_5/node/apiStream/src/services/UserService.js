import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserService {
    
    // Créer un nouvel utilisateur
    async create(user_data) {
        try {
            return await prisma.user.create({
                data: user_data,
            });
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    // Récupérer tous les utilisateurs
    async getAll() {
        try {
            return await prisma.user.findMany();
        } catch (error) {
            throw new Error(`Error retrieving users: ${error.message}`);
        }
    }

    // Récupérer un utilisateur par ID
    async get_user(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
            });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            throw new Error(`Error retrieving user: ${error.message}`);
        }
    }

    // Mettre à jour un utilisateur par ID
    async update(id, user_data) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: user_data,
            });
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Supprimer un utilisateur par ID
    async delete(id) {
        try {
            await prisma.user.delete({
                where: { id: id },
            });
            return { message: "User deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}


















// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()


// export default class UserService {
//     create(user_data){
        
//     }

//     async getAll(){
//         try {
//             return await prisma.user.findMany();
//         } catch (error) {
//             throw new Error(error)
//         }
//     }

//     get_user(_id){
//         try {
//             return prisma.user.findUnique({
//                 where: { 
//                     id: _id 
//                 },
//             });
//         } catch (error) {
//             throw new Error(error)
//         }
//     }

//     update(id, user_data){
//         return {};
//     }


//     delete(id){
//         return {};
//     }

// }