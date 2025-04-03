import { PrismaClient } from "@prisma/client";
 import { hashPassword, verifyPassword, generateToken } from "../auth/AuthUtils.js";
const prisma = new PrismaClient();

const userResolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({ 
        include: { contacts: true } 
      })
    },
  },

  Mutation: {
    register: async (_, { name, email, password }) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("Email déjà utilisé !");
    
      const hashedPassword = await hashPassword(password);
    
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
        select: { 
          id: true, 
          name: true, 
          email: true, 
          password:true,
          createdAt: true, 
          updatedAt: true 
        }
      });
    
      return user; 
    },
    


    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Utilisateur non trouvé");

      const valid = await verifyPassword(password, user.password);
      if (!valid) throw new Error("Mot de passe incorrect");

      const token = generateToken(user);

      return { token, user }; // On garde le token pour le login
    }
  }
};

export default userResolvers;