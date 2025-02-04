import { PrismaClient } from "@prisma/client";
import { signup, login } from "./auth.js";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => "Hello, World!", // Définir le résolveur pour "hello"
    users: async (parent, args) => {
      // console.log(await prisma.user.findMany({ include: { contacts: true } }));
      return await prisma.user.findMany({ include: { contacts: true } });
    },
    user: async (parent, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: { contacts: true },
      });
    },
    contacts: async (parent, args) => {
      return await prisma.contact.findMany({ include: { user: true } });
    },
    contact: async (parent, { id }) => {
      return await prisma.contact.findUnique({
        where: { id },
        include: { user: true },
      });
    },
  },
  Mutation: {
    createUser: async (parent, { name, email }) => {
      return await prisma.user.create({
        data: { name, email },
      });
    },
    createContact: async (parent, { phone, address, userId }) => {
      return await prisma.contact.create({
        data: { phone, address, userId },
      });
    },
    updateUser: async (parent, { id, name, email }) => {
      return prisma.user.update({
        where: { id },
        data: { name, email },
      });
    },
    updateContact: async (parent, { id, phone, address }) => {
      return prisma.contact.update({
        where: { id },
        data: { phone, address },
      });
    },
    deleteUser: async (parent, { id }) => {
      await prisma.user.delete({ where: { id } });
      return true;
    },
    deleteContact: async (parent, { id }) => {
      await prisma.contact.delete({ where: { id } });
      return true;
    },
    signup,
    login,
  },
};

export default resolvers;
