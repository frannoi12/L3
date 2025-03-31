import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (_, { name, email, password }) => {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Un utilisateur avec cet email existe déjà !");
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'utilisateur
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Génération du token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Exclure le mot de passe dans la réponse
  const { password: removePassword, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const login = async (_, { email, password }) => {
  // Vérifier si l'utilisateur existe
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Utilisateur non trouvé !");
  }

  // Vérifier le mot de passe
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Mot de passe incorrect !");
  }

  // Génération du token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Exclure le mot de passe dans la réponse
  const { password: removePassword, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};
