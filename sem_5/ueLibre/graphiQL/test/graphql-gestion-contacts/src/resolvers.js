import { PrismaClient } from "@prisma/client";
import { signup, login } from "./auth.js";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    users: async (_, __, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      return await prisma.user.findMany({ include: { contacts: true } });
    },
    contacts: async (_, __, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      return await prisma.contact.findMany({ include: { user: true } });
    },    
    // users: async () => await prisma.user.findMany({ include: { contacts: true } }),
    user: async (_, { id }) => {
      const user = await prisma.user.findUnique({ where: { id }, include: { contacts: true } });
      if (!user) throw new Error("User not found");
      return user;
    },
    // contacts: async () => await prisma.contact.findMany({ include: { user: true } }),
    contact: async (_, { id }) => {
      const contact = await prisma.contact.findUnique({ where: { id }, include: { user: true } });
      if (!contact) throw new Error("Contact not found");
      return contact;
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await prisma.user.create({ data: { name, email } });
    },
    createContact: async (_, { phone, address }, { userId }) => {
      if (!user) throw new Error("Not authenticated");

      return await prisma.contact.create({
        data: { phone, address, userId },
      });
    },
    updateUser: async (_, { id, name, email }) => {
      const userExists = await prisma.user.findUnique({ where: { id } });
      if (!userExists) throw new Error("User not found");

      return prisma.user.update({ where: { id }, data: { name, email } });
    },
    // updateContact: async (_, { id, phone, address }) => {
    //   const contactExists = await prisma.contact.findUnique({ where: { id } });
    //   if (!contactExists) throw new Error("Contact not found");

    //   return prisma.contact.update({ where: { id }, data: { phone, address } });
    // },
    deleteUser: async (_, { id }) => {
      const userExists = await prisma.user.findUnique({ where: { id } });
      if (!userExists) throw new Error("User not found");

      await prisma.user.delete({ where: { id } });
      return true;
    },
    // deleteContact: async (_, { id }) => {
    //   const contactExists = await prisma.contact.findUnique({ where: { id } });
    //   if (!contactExists) throw new Error("Contact not found");

    //   await prisma.contact.delete({ where: { id } });
    //   return true;
    // },
    updateContact: async (_, { id, phone, address }, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
    
      const contact = await prisma.contact.findUnique({ where: { id } });
      if (!contact || contact.userId !== userId) throw new Error("Unauthorized");
    
      return prisma.contact.update({ where: { id }, data: { phone, address } });
    },
    deleteContact: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
    
      const contact = await prisma.contact.findUnique({ where: { id } });
      if (!contact || contact.userId !== userId) throw new Error("Unauthorized");
    
      await prisma.contact.delete({ where: { id } });
      return true;
    },    
    signup,
    login,
  },
};

export default resolvers;
