import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserService {
    
    // Créer un nouvel utilisateur
    async create(user_data) {
        try {
            return prisma.user.create({
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
            const deletUser = await prisma.user.delete({
                where: { id: id },
            });
            // console.log(deletUser);
            // return deletUser;
            return { success: true, message: 'Utilisateur supprimé avec succès.' };
        } catch (error) {
            if (error.code === 'P2025') {
                // Si l'utilisateur n'existe pas, renvoyer false avec un message
                console.log("Utilisateur non trouvé, rien à supprimer.");
                return { success: false, message: `L'utilisateur avec l'ID ${id} n'existe pas dans la base de données.` };
            }
    
            // Autres erreurs génériques
            console.log("Une erreur inconnue est survenue lors de la suppression.");
            return { success: false, message: `Erreur lors de la suppression de l'utilisateur avec l'ID ${id}: ${error.message}` };
        }
    }

    async findByEmail(_email) {    
        try {
            return prisma.user.findUnique({
                where: { email: _email }
            });
    
        } catch (error) {
            // console.error("Error in findByEmail:", error.message);
            throw new Error(error); // Re-throw the error to handle it in calling function
        }
    }
    

}




